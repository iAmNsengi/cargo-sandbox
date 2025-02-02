import mongoose from "mongoose";

const traineeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainingSite: {
      type: mongoose.Schema.ObjectId,
      ref: "TrainingSite",
      required: true,
    },
    participantNumber: { type: String, required: true },

    githubUsername: String,

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
    status: {
      type: String,
      enum: ["active", "dropped", "graduated", "on_probation"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Add indexes for common queries and relationships
traineeSchema.index({ userId: 1 }, { unique: true });
traineeSchema.index({ trainingSite: 1 });
traineeSchema.index({ participantNumber: 1 }, { unique: true });
traineeSchema.index({ status: 1 });
traineeSchema.index({ githubUsername: 1 }, { sparse: true });

const Trainee = new mongoose.model("Trainee", traineeSchema);

export default Trainee;
