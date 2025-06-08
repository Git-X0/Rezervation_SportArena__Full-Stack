import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { environment } from "../config/environment";
import logger from "../utils/logger";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: "Authentication required",
            });
        }

        const decoded = jwt.verify(token, environment.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error("Authentication error:", error);
        res.status(401).json({
            error: "Invalid token",
        });
    }
};

export const adminMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({
                error: "Admin access required",
            });
        }
        next();
    } catch (error) {
        logger.error("Admin authorization error:", error);
        res.status(403).json({
            error: "Access denied",
        });
    }
};
