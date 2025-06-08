import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

// Rate limiting configuration
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS configuration
export const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? ["https://your-production-domain.com"] // Add your production domain
            : ["http://localhost:4200"], // Angular dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // 24 hours
};

// Security middleware
export const securityMiddleware = [
    // Basic security headers
    helmet(),

    // CORS
    cors(corsOptions),

    // Rate limiting
    rateLimiter,

    // Custom security headers
    (req: Request, res: Response, next: NextFunction) => {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "DENY");
        res.setHeader("X-XSS-Protection", "1; mode=block");
        next();
    },
];
