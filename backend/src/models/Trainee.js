import mongoose, { mongo } from "mongoose";

const traineeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cohort: {
      type: String,
      required: true,
    },
    githubUsername: String,
    university: String,
    graduationYear: Number,
    performance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Perfomance",
      },
    ],
    gateInterviews: [
      { type: mongoose.Schema.Types.ObjectId, ref: "GateInterview" },
    ],
  },
  { timestamps: true }
);

const Trainee = new mongoose.model("Trainee", traineeSchema);

export default Trainee;
