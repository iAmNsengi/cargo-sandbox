import mongoose from "mongoose";

const gateQuestionSchema = new mongoose.Schema(
  {
    gate: { type: mongoose.Schema.Types.ObjectId, ref: "Gate", required: true },
    theoryQuestions: [{ type: String, required: true }],
    practicalQuestions: [{ type: String }],
    round: { type: Number, default: 1 },
  },
  { timestamps }
);

const GateQuestion = new mongoose.model("GateQuestion", gateQuestionSchema);

export default GateQuestion;
