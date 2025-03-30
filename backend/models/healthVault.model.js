import mongoose from "mongoose";

const healthVaultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User ",
            required: true,
        },
        sections: [
            {
                name: {
                    type: String,
                    required: true,
                },
                files: [
                    {
                        fileName: String,
                        fileUrl: String,
                    },
                ],
                texts: [
                    {
                        content: String,
                        createdAt: {
                            type: Date,
                            default: Date.now,
                        },
                    },
                ],
            },
        ],
    },
    { timestamps: true }
);

export const HealthVault = mongoose.model("HealthVault", healthVaultSchema);
