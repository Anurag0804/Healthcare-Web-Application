import express from "express";
import {
    createOrUpdateHealthVault,
    getHealthVault,
} from "../controllers/healthVault.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"; // Import the token verification middleware

const router = express.Router();

// Routes
router.post("/", verifyToken, createOrUpdateHealthVault); // Protect the route with verifyToken
router.get("/", verifyToken, getHealthVault); // Protect the route with verifyToken

export default router;
