import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router();

// protect all routes with auth
router.use(protect);

// routes only accessible to coaches and admin
router.use(restrictTo("coach", "admin"));

router.route("").get(allGates).post(createGate);

router.route(":/id").get(getGateById).patch(editGate).delete(deleteGate);

router.post("/schedule", scheduleGateInterview);

export default router;
