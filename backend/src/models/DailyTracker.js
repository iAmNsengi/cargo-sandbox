import mongoose from "mongoose";

const dailyTrackerSchema = new mongoose.Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: [true, "Trainee reference is required"],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    presence: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    arrivingOnTime: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    speakingMuscles: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    followingCalendar: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    codewars: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    touchTyping: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    breaksManagement: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    communication: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    bodyLanguage: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    tenHours: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    teamCollaboration: {
      type: Number,
      required: true,
      min: [1, "Minimum score is 1"],
      max: [5, "Maximum score is 5"],
    },
    coachNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
dailyTrackerSchema.index({ trainee: 1, date: 1 }, { unique: true });
dailyTrackerSchema.index({ date: 1 });

// Virtual for calculating daily overall score
dailyTrackerSchema.virtual("dailyScore").get(function () {
  const scores = [
    this.presence,
    this.arrivingOnTime,
    this.speakingMuscles,
    this.followingCalendar,
    this.codewars,
    this.touchTyping,
    this.breaksManagement,
    this.communication,
    this.bodyLanguage,
    this.tenHours,
    this.teamCollaboration,
  ];

  return scores.reduce((acc, score) => acc + score, 0) / scores.length;
});

const DailyTracker = mongoose.model("DailyTracker", dailyTrackerSchema);

export default DailyTracker;
