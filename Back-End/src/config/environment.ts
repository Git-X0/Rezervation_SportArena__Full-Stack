import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

export const environment = {
    // Server
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "3000", 10),

    // Database
    DB_DIALECT: process.env.DB_DIALECT || "sqlite",
    DB_STORAGE: process.env.DB_STORAGE || "./database.sqlite",

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",

    // Session
    SESSION_SECRET: process.env.SESSION_SECRET || "your-session-secret",

    // Logging
    LOG_LEVEL: process.env.LOG_LEVEL || "info",

    // CORS
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:4200",

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: parseInt(
        process.env.RATE_LIMIT_WINDOW_MS || "900000",
        10
    ),
    RATE_LIMIT_MAX_REQUESTS: parseInt(
        process.env.RATE_LIMIT_MAX_REQUESTS || "100",
        10
    ),
};
