import mongoose from "mongoose";
import User from "./User";

const trainingSiteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    siteManager: { type: mongoose.Schema.Types.ObjectId, ref: User },
    cohort: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ["open", "closed"] },
  },
  { timestamps: true }
);

const TrainingSite = new mongoose.model("TrainingSite", trainingSiteSchema);

export default TrainingSite;
