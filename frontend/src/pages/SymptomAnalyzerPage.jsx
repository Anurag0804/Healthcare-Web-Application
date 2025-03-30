// ... other imports
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useAiAgentStore } from "../store/aiAgentStore";
import IconStore from "../components/IconStore";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import funnyLoadingTexts from "../store/funnyLoadingTexts";
import LeftNavbar from "../components/LeftNavBar";
import remarkGfm from "remark-gfm";

const SymptomAnalyzerPage = () => {
    const { user } = useAuthStore();
    const { sendMessage, response, isLoading } = useAiAgentStore();
    const responseRef = useRef(null);

    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages
            ? JSON.parse(savedMessages)
            : [
                  {
                      text: `Hello **${user.name}**! Tell me your symptoms, and I'll help analyze them.`,
                      sender: "agent",
                  },
              ];
    });

    const [input, setInput] = useState("");
    const [loadingText, setLoadingText] = useState(
        funnyLoadingTexts[Math.floor(Math.random() * funnyLoadingTexts.length)]
    );

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (response && response !== responseRef.current) {
            responseRef.current = response;
            try {
                const data = JSON.parse(response.response);
                const aiMessages = data.response.filter((item) =>
                    item.id[item.id.length - 1].includes("AIMessage")
                );

                if (aiMessages.length > 0) {
                    const lastMessage = aiMessages[aiMessages.length - 1];
                    if (lastMessage.kwargs.content) {
                        const newMessage = {
                            text: lastMessage.kwargs.content,
                            sender: "agent",
                        };

                        setMessages((prev) => {
                            const isDuplicate = prev.some(
                                (msg) =>
                                    msg.text === newMessage.text &&
                                    msg.sender === newMessage.sender
                            );
                            return isDuplicate ? prev : [...prev, newMessage];
                        });
                    }
                }
            } catch (error) {
                console.error("Error processing AI response:", error);
            }
        }
    }, [response]);

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        setLoadingText(
            funnyLoadingTexts[
                Math.floor(Math.random() * funnyLoadingTexts.length)
            ]
        );

        const userMessage = {
            text: input,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            await sendMessage(input);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem("chatMessages");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () =>
            window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="h-screen w-full flex">
            {/* Left Navbar */}
            <div className="min-w-[250px]">
                <LeftNavbar />
            </div>

            {/* Chat Container */}
            <div className="flex-1 font-inter bg-green-100 p-4 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 p-4 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center"
                >
                    <h2 className="text-3xl font-bold mb-1 mt-4 text-center text-green-700">
                        AI-Powered{" "}
                        <span className="text-emerald-900">
                            Symptom Analyzer
                        </span>
                    </h2>
                    <p className="text-lg mb-6 font-semibold text-center text-gray-600">
                        Describe your symptoms, and I'll analyze them for you.
                    </p>

                    {/* Chat Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3 w-full max-w-5xl" // Increased width here
                    >
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`py-2 px-3 rounded-lg max-w-lg w-fit break-words drop-shadow ${
                                    msg.sender === "user"
                                        ? "bg-green-600 text-white self-end ml-auto rounded-br-none"
                                        : "bg-green-200 text-gray-800 self-start rounded-bl-none"
                                }`}
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.text}
                                </ReactMarkdown>
                            </motion.div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="relative flex items-center mt-4 p-1 w-full max-w-5xl bg-green-200 rounded-lg border-2 border-green-500 shadow-lg focus-within:border-green-600">
                        {" "}
                        {/* Increased width here */}
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                !isLoading &&
                                handleSendMessage()
                            }
                            className="flex-1 bg-transparent outline-none p-2 text-gray-800 placeholder-gray-500"
                            placeholder="Describe your symptoms..."
                            disabled={isLoading}
                        />
                        {/* AI "Thinking" Indicator */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="absolute -top-12 w-full flex items-center justify-center"
                            >
                                <div className="bg-green-500 p-2 rounded-lg flex items-center justify-center text-white shadow-lg">
                                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                    <p className="text-sm">{loadingText}</p>
                                </div>
                            </motion.div>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendMessage}
                            className={`ml-2 p-3 bg-green-600 cursor-pointer text-white rounded-lg focus:outline-none ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin w-5 h-5 text-green-300" />
                            ) : (
                                <IconStore
                                    name="send"
                                    className="w-5 h-5"
                                    color="white"
                                />
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SymptomAnalyzerPage;
