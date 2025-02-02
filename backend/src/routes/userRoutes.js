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
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middlewares/validateRequest.js";

const router = express.Router();

// Protect all routes
router.use(protect);
// Restrict to admin
router.use(restrictTo("admin"));

router.route("/").get(getUsers).post(validateCreateUser, createUser);

router.post("/bulk", uploadUserFile, bulkCreateUsers);

router
  .route("/:id")
  .get(getUser)
  .patch(validateUpdateUser, updateUser)
  .delete(deactivateUser);

export default router;
