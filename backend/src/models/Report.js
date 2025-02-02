import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["weekly", "monthly", "gate", "cohort", "individual"],
      required: true,
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
    },
    cohort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingSite",
    },
    period: {
      startDate: Date,
      endDate: Date,
    },
    metrics: {
      attendance: {
        present: Number,
        absent: Number,
        late: Number,
        percentage: Number,
      },
      performance: {
        average: Number,
        trend: String,
        strengths: [String],
        improvements: [String],
      },

      technicalSkills: {
        codewarProgress: Number,
        githubContributions: Number,
        projectCompletions: Number,
      },
      softSkills: {
        communicationScore: Number,
        teamworkScore: Number,
        professionalismScore: Number,
      },
    },
    recommendations: [String],
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Report = new mongoose.model("Report", reportSchema);

export default Report;
