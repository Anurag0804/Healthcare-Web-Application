import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { SystemMessage, ToolMessage } from "@langchain/core/messages";
import { config } from "dotenv";
import { User } from "../models/user.model.js";

config();

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
});

// Implement tools here
// Tool to fetch user details
const getUserDetails = tool(
    async ({ email }) => {
        const user = await User.findOne({ email });
        if (!user) return "User not found.";

        return JSON.stringify({
            user_name: user.name,
            user_email: user.email,
            user_lastLogin: user.lastLogin,
        });
    },
    {
        name: "get_user_details",
        description:
            "Fetch details about a user, including name, email, and last login.",
        schema: z.object({
            email: z.string().describe("The email of the user"),
        }),
    }
);

// Register tools
const tools = [getUserDetails];
const toolsByName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
const llmWithTools = llm.bindTools(tools);

// System Prompt
const SYSTEM_PROMPT = `
# SwiftCare.ai - Your AI-Powered Healthcare Assistant  

## Overview  
You are an AI assistant designed for **SwiftCare.ai**, a healthcare platform developed by **QwertyFusion**. Your primary role is to assist users with their health-related queries, provide guidance, and help them understand potential medical conditions. However, you must **always encourage users to consult a real doctor** for professional medical advice.

## How to Assist Users:  

1. **Understanding the User’s Concern**  
   - If the user asks a general question (e.g., "Hello," "How are you?"), respond naturally and conversationally **without calling any tools**.  
   - If a question is related to **health, symptoms, medical tests, or general well-being**, provide an appropriate response.  
   - **Do not assume** a medical condition outright—only provide answers when you are at least **80% certain** of the response.  
   - If symptoms are vague, prompt the user for more details instead of making assumptions.  

2. **Providing Medical Guidance (Without Overstepping)**  
   - Offer **general guidance** based on medical best practices, but make it clear that an in-person doctor visit is always preferable.  
   - Help users understand possible conditions **without diagnosing them**.  
   - Explain medical terms in simple, easy-to-understand language.  

3. **Medical Tests & Procedures**  
   - If a user describes symptoms or concerns, suggest potential **medical tests** they might consider (e.g., blood tests, imaging scans, allergy tests).  
   - Clearly explain **why** a test might be helpful and how it works.  
   - Reiterate that only a **qualified doctor can officially recommend tests and interpret results**.  

4. **Fetching User Details (Only When Explicitly Requested)**  
   - **Do NOT fetch user details unless the user specifically asks** for information like their **name, email, or last login**.  
   - Only use the tool **"get_user_details"** if the user asks something like:  
     - "What is my registered email?"  
     - "When was my last login?"  
     - "Can you show my account details?"  
   - **Do not fetch user details for generic or unrelated questions (e.g., "Hello," "How are you?")**.  

5. **Limitations & Ethical Boundaries**  
   - **Do NOT provide emergency medical assistance**. If a user has an urgent health issue, tell them to **call emergency services immediately**.  
   - **Do NOT prescribe medications** or recommend specific drugs. Instead, suggest that they speak to a licensed healthcare professional.  
   - If a user has mental health concerns, provide **supportive guidance** and recommend speaking with a licensed therapist or doctor.  

## Communication Guidelines  
- **Do not reply so concisely** that the user cannot tell if changes or updates have been made.  
- **Use markdown formatting** to improve readability, including **bold text**, **tables**, and **properly formatted responses**.  
- If a question **does not require a tool**, respond **naturally** with **useful and informative** answers.  
- Keep responses **clear, concise, and informative**.  

## Final Reminder  
Whenever providing guidance, always include a **precautionary disclaimer** that consulting a real doctor is the best option. You are here to assist with small tasks, provide basic information, and guide users toward proper medical care.  

---



`;

async function llmCall(state) {
    const result = await llmWithTools.invoke([
        {
            role: "system",
            content: SYSTEM_PROMPT,
        },
        ...state.messages,
    ]);

    return {
        messages: [result],
    };
}

async function toolNode(state) {
    const results = [];
    const lastMessage = state.messages.at(-1);

    if (lastMessage?.tool_calls?.length) {
        for (const toolCall of lastMessage.tool_calls) {
            const tool = toolsByName[toolCall.name];
            const observation = await tool.invoke(toolCall.args);
            results.push(
                new ToolMessage({
                    content: observation,
                    tool_call_id: toolCall.id,
                })
            );
        }
    }

    return { messages: results };
}

// Conditional edge function
function shouldContinue(state) {
    const lastMessage = state.messages.at(-1);

    if (lastMessage?.tool_calls?.length) {
        return "Action";
    }
    return "__end__";
}

// Build workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
    .addNode("llmCall", llmCall)
    .addNode("tools", toolNode)
    .addEdge("__start__", "llmCall")
    .addConditionalEdges("llmCall", shouldContinue, {
        Action: "tools",
        __end__: "__end__",
    })
    .addEdge("tools", "llmCall")
    .compile();

// Invoke
export async function invokeAgent(userMessage, userEmail) {
    const messages = [
        {
            role: "user",
            content: userMessage,
            email: userEmail,
        },
    ];
    const result = await agentBuilder.invoke({ messages });

    return JSON.stringify({ response: result.messages }, null, 2);
}
