import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMS
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Too many requests from this IP, please try again in 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
});

export const authLimiter = rateLimit({
  max: 5,
  windowMs: 15 * 60 * 1000,
  message: "Too many login attemps, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
