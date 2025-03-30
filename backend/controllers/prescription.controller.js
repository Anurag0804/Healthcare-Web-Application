import { Prescription } from "../models/prescription.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini AI

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to extract text from an image using Gemini AI
const extractTextFromImage = async (imageUrl) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Determine the MIME type based on the file extension
        const fileExtension = imageUrl.split(".").pop().toLowerCase();
        const mimeTypes = {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            webp: "image/webp",
        };
        const mimeType = mimeTypes[fileExtension] || "image/jpeg"; // Default to JPEG if unknown

        const prompt = `You are an AI that extracts and summarizes medical prescription details.  
        
        **Task:**  
        1. **Extract** all readable text from the provided prescription image.  
        2. **Reformat and summarize** the prescription details in a professional and structured manner.  
        3. Use **Markdown formatting** (headings, bullet points, bold text) to enhance readability.  
        4. **Do NOT** use a conversational tone—just present the information clearly and formally.  

        **Example Output Format:**  
        ---
        ## **Prescription Details**
        - **Patient Name:** [Extracted Name]  
        - **Doctor:** [Extracted Doctor's Name]  
        - **Date:** [Extracted Date]  

        ## **Medications Prescribed**  
        - **[Medicine Name]** – [Dosage] – [Instructions]  
        - **[Medicine Name]** – [Dosage] – [Instructions]  

        ## **Additional Notes**  
        - [Any extra information found in the prescription]
        ---
        If the image text is unclear, respond with:  
        **"OCR and AI-based insights not available."**`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        { inline_data: { mime_type: mimeType, url: imageUrl } },
                    ],
                },
            ],
        });

        const extractedText = result.response.text();

        return extractedText && extractedText.trim() !== ""
            ? extractedText
            : "OCR and AI-based insights not available"; // Default message if OCR fails
    } catch (error) {
        console.error("Error extracting text from image:", error);
        return "OCR and AI-based insights not available"; // Default message on error
    }
};

// Upload Prescription
export const uploadPrescription = async (req, res) => {
    try {
        const { fileUrl, fileName, email } = req.body;

        if (!fileUrl || !fileName || !email) {
            return res
                .status(400)
                .json({ error: "Missing fileUrl, fileName, or email" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract text from the prescription image
        const ocrText = await extractTextFromImage(fileUrl);

        // Create a new prescription entry
        const newPrescription = await Prescription.create({
            userId: user._id,
            fileName,
            fileUrl,
            ocrText, // Store extracted text
        });

        res.status(201).json({
            success: true,
            message: "Prescription uploaded successfully",
            prescription: newPrescription,
        });
    } catch (error) {
        console.error("Error uploading prescription:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

// Get Prescriptions for Logged-in User
export const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ userId: req.userId });

        if (!prescriptions.length) {
            return res.status(200).json({
                success: true,
                prescriptions: [],
                message: "No prescriptions uploaded yet.",
            });
        }

        return res.status(200).json({ success: true, prescriptions });
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        return res
            .status(500)
            .json({ success: false, message: "Server error." });
    }
};

// Delete Prescription
export const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the prescription
        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        // Ensure the logged-in user owns the prescription
        if (prescription.userId.toString() !== req.userId) {
            return res.status(403).json({ error: "Unauthorized action" });
        }

        // Delete from Cloudinary (Optional)
        const filePublicId = prescription.fileUrl
            .split("/")
            .pop()
            .split(".")[0];
        await cloudinary.uploader.destroy(`swiftcareAI/${filePublicId}`);

        // Delete from MongoDB
        await Prescription.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Prescription deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting prescription:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Overwrite OCRText
export const updateOcrText = async (req, res) => {
    try {
        const { id } = req.params;
        const { ocrText } = req.body;

        if (!ocrText || ocrText.trim() === "") {
            return res.status(400).json({ error: "OCR text cannot be empty." });
        }

        // Find the prescription
        const prescription = await Prescription.findById(id);
        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        // Ensure the logged-in user owns the prescription
        if (prescription.userId.toString() !== req.userId) {
            return res.status(403).json({ error: "Unauthorized action" });
        }

        // Update OCR text
        prescription.ocrText = ocrText;
        await prescription.save();

        res.status(200).json({
            success: true,
            message: "OCR text updated successfully",
            prescription,
        });
    } catch (error) {
        console.error("Error updating OCR text:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
