import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String, // Cloudinary URL
            required: true,
        },
        uploadDate: {
            type: Date,
            default: Date.now,
        },
        ocrText: {
            type: String, // For future OCR functionality
            default: "",
        },
    },
    { timestamps: true }
);

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
