import express from "express";
import { restrictTo } from "../controllers/authController";

const router = express.Router();

router.use(protect);
router.use(restrictTo("coach", "admin"));

router.route("/").get(getAllTrainees);

router
  .route(":/id")
  .get(getTraineeById)
  .patch(editTraineeInformation)
  .delete(deleteTrainee);

export default router;
