import express from "express";
import {
  createUser,
  bulkCreateUsers,
  getUsers,
  getUser,
  updateUser,
  deactivateUser,
  uploadUserFile,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// Protect all routes
router.use(protect);
// Restrict to admin
router.use(restrictTo("admin"));

router.route("/").get(getUsers).post(createUser);

router.post("/bulk", uploadUserFile, bulkCreateUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deactivateUser);

export default router;
