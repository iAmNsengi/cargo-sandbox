import express from "express";
import {
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} from "../controllers/authController.js";
import {
  validateLogin,
  validateUpdatePassword,
} from "../middlewares/validateRequest.js";
import { authLimiter } from "../config/rateLimit.js";

const router = express.Router();

router.use("/login", authLimiter);
router.post("/login", validateLogin, login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch("/updateMyPassword", validateUpdatePassword, updatePassword);

// Restrict to admin
router.use(restrictTo("admin"));

export default router;
