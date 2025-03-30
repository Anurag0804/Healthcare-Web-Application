import { HealthVault } from "../models/healthVault.model.js";

// Create or Update Health Vault
export const createOrUpdateHealthVault = async (req, res) => {
    const { sections } = req.body;
    const userId = req.userId; // Get userId from the request

    try {
        const healthVault = await HealthVault.findOneAndUpdate(
            { userId },
            { sections },
            { new: true, upsert: true }
        );
        res.status(200).json(healthVault);
    } catch (error) {
        console.error("Error saving health vault:", error);
        res.status(500).json({ message: "Error saving health vault", error });
    }
};

// Get Health Vault
export const getHealthVault = async (req, res) => {
    const userId = req.userId; // Get userId from the request

    try {
        const healthVault = await HealthVault.findOne({ userId });
        res.status(200).json(healthVault || { sections: [] });
    } catch (error) {
        console.error("Error fetching health vault:", error);
        res.status(500).json({ message: "Error fetching health vault", error });
    }
};
