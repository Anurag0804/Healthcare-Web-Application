import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
    sendPasswordResetEmail,
    sendResetSuccessEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
} from "../mailtrap/email.js";

export const signup = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }

        const userAlreadyExistsOrNot = await User.findOne({ email });
        console.log("user already exists", userAlreadyExistsOrNot);
        if (userAlreadyExistsOrNot) {
            return res
                .status(400)
                .json({ success: false, message: "User Already Exists" });
        }

        // Check if the password is at least 6 characters long
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long.");
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            throw new Error(
                "Password must contain at least one uppercase letter."
            );
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            throw new Error(
                "Password must contain at least one lowercase letter."
            );
        }

        // Check for at least one number
        if (!/[0-9]/.test(password)) {
            throw new Error("Password must contain at least one number.");
        }

        // Check for at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            throw new Error(
                "Password must contain at least one special character."
            );
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationCode();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await user.save();
        // jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created sucessfully",
            user: {
                ...user._doc,
                password: null,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired Verification Code",
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email Verification Successfull",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in Successfull",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in login", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

// comment
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 15 * 60 * 1000; // 15 minutes

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(
            user.email,
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`
        );

        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });
    } catch (error) {
        console.log("Error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10); // Using 10 as salt length

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
