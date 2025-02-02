import mongoose from "mongoose";

const gaterInterviewSchema = new mongoose.Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true,
    },
    gate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gate",
      required: true,
    },
    interviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    technicalAssessment: {
      algorithmicThinking: {
        score: { type: Number, min: 1, max: 5 },
        comments: String,
      },
      problemSolving: {
        score: { type: Number, min: 1, max: 5 },
        comments: String,
      },
      codeQuality: {
        score: { type: Number, min: 1, max: 5 },
        comments: String,
      },
      systemDesign: {
        score: { type: Number, min: 1, max: 5 },
        comments: String,
      },
    },
    softSkillsAssessment: {
      communication: {
        score: { type: Number, min: 1, max: 5 },
        comments: String,
      },
      professionalism: {
        score: { type: Number, min: 1, max: 5 },
        comments: String,
      },
    },
    overallFeedback: String,
    recommendations: String,
  },
  { timestamps: true }
);

// calculate average score
gaterInterviewSchema.methods.calculateScore = function () {
  const technical =
    Object.values(this.technicalAssessment).reduce((acc, val) => acc + val, 0) /
    this.technicalAssessment.length;

  const softSkills =
    Object.values(this.softSkills).reduce((acc, val) => acc + val, 0) /
    this.softSkills.length;
  return { technical, softSkills, overall: (technical + softSkills) / 2 };
};

const GateInterview = new mongoose.model("GateInterview", gaterInterviewSchema);

export default GateInterview;
