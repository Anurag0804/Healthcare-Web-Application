import express from "express";
import {
    uploadPrescription,
    getPrescriptions,
    deletePrescription,
    updateOcrText, // Import the new function
} from "../controllers/prescription.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Routes
router.post("/upload", verifyToken, uploadPrescription);
router.get("/", verifyToken, getPrescriptions);
router.delete("/delete/:id", verifyToken, deletePrescription);
router.patch("/update-ocr/:id", verifyToken, updateOcrText); // New route for updating OCR text

export default router;
