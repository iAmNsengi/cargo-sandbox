import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

// protect all routes
router.use(protect);

// routes only accessible to coaches and admin
router.use(restrictTo("coach", "admin"));

// routes
router.post("/schedule", scheduleGateInterview);
