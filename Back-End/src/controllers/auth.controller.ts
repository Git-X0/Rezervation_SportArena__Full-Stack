import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { environment } from "../config/environment";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: "Email already registered",
            });
        }

        const user = await User.create({ email, password });
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            environment.JWT_SECRET,
            { expiresIn: environment.JWT_EXPIRES_IN }
        );

        res.status(201).json({ token });
    } catch (error) {
        logger.error("Registration error:", error);
        res.status(500).json({
            error: "Error during registration",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials",
            });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            environment.JWT_SECRET,
            { expiresIn: environment.JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (error) {
        logger.error("Login error:", error);
        res.status(500).json({
            error: "Error during login",
        });
    }
};
