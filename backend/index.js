import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/connectdb.js";
import authRoutes from "./routes/auth.route.js";
import prescriptionRoutes from "./routes/prescription.route.js";
import healthVaultRoutes from "./routes/healthVault.route.js";
import aiRoutes from "./routes/ai_agent.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to pass JSON payloads in incoming requests
app.use(cookieParser());

app.listen(port, () => {
    connectDB();
    console.log(
        `Server is running on port ${port}. Open at http://localhost:${port}`
    );
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/healthVault", healthVaultRoutes);
app.use("/api/ai", aiRoutes);
