import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";

import corsOptions from "./config/corsOptions.js";
import { limiter } from "./config/rateLimit.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Request logging
app.use(logger);

// CORS configuration
app.use(cors(corsOptions));

// Rate limiting
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["date", "status", "sort"],
  })
);

// Compression
app.use(compression());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/gates", gateRoutes);
app.use("/api/v1/trainees", traineeRoutes);
app.use("/api/v1/users", userRoutes);

// Error handling
app.use(errorHandler);

export default app;
