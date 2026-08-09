import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { BrevoClient } from "@getbrevo/brevo";
import { randomInt } from "crypto";

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

const createToken = (user) => jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

const sendLoginOtp = async (user, otp) => {
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
        const error = new Error("Email verification is not configured");
        error.status = 503;
        throw error;
    }

    const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
    await brevo.transactionalEmails.sendTransacEmail({
        subject: "Your EventBook login verification code",
        textContent: `Your EventBook verification code is ${otp}. It expires in 10 minutes. Do not share this code with anyone.`,
        htmlContent: `<p>Your EventBook verification code is:</p><p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p><p>This code expires in 10 minutes. Do not share it with anyone.</p>`,
        sender: {
            name: process.env.BREVO_SENDER_NAME || "EventBook",
            email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: user.email, name: user.name }],
    });
};

// ================= REGISTER =================
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim() || !email?.trim() || !password || password.length < 6) {
            return res.status(400).json({ message: "Name, a valid email, and a password of at least 6 characters are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role:user.role
            }
        });

    } catch (error) { next(error); }
};

// ================= LOGIN =================
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

        // Check if email exists
        const user = await User.findOne({ email: email.trim().toLowerCase() });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const otp = String(randomInt(100000, 1000000));
        user.loginOtpHash = await bcrypt.hash(otp, 10);
        user.loginOtpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
        user.loginOtpAttempts = 0;
        await user.save();

        try {
            await sendLoginOtp(user, otp);
        } catch (error) {
            user.loginOtpHash = undefined;
            user.loginOtpExpiresAt = undefined;
            user.loginOtpAttempts = 0;
            await user.save();
            throw error;
        }

        res.status(200).json({
            message: "A verification code has been sent to your email",
            requiresOtp: true,
            email: user.email,
        });

    } catch (error) { next(error); }
};

// ================= VERIFY LOGIN OTP =================
export const verifyLoginOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email?.trim() || !/^\d{6}$/.test(String(otp || ""))) {
            return res.status(400).json({ message: "A valid email and 6-digit verification code are required" });
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !user.loginOtpHash || !user.loginOtpExpiresAt) {
            return res.status(400).json({ message: "No active verification code. Please log in again." });
        }

        if (user.loginOtpExpiresAt < new Date()) {
            user.loginOtpHash = undefined;
            user.loginOtpExpiresAt = undefined;
            user.loginOtpAttempts = 0;
            await user.save();
            return res.status(400).json({ message: "Verification code has expired. Please log in again." });
        }

        if (user.loginOtpAttempts >= MAX_OTP_ATTEMPTS) {
            user.loginOtpHash = undefined;
            user.loginOtpExpiresAt = undefined;
            user.loginOtpAttempts = 0;
            await user.save();
            return res.status(429).json({ message: "Too many incorrect attempts. Please log in again." });
        }

        const isMatch = await bcrypt.compare(String(otp), user.loginOtpHash);
        if (!isMatch) {
            user.loginOtpAttempts += 1;
            await user.save();
            return res.status(401).json({ message: "Invalid verification code" });
        }

        user.loginOtpHash = undefined;
        user.loginOtpExpiresAt = undefined;
        user.loginOtpAttempts = 0;
        await user.save();

        res.status(200).json({
            message: "Login successful",
            token: createToken(user),
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) { next(error); }
};
