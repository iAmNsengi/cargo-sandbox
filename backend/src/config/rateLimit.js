import rateLimit from "express-rate-limit";

// mx 100 requests per ip in 15 min
export const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 15 minutes",
  standardHeaders: true,
  legacyHeaders: true,
});

// max 5 attempts for login in 15 min
export const authLimiter = rateLimit({
  max: 5,
  windowMs: 15 * 60 * 1000,
  message: "Too many login attemps, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
