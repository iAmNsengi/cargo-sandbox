import mongoose from "mongoose";

const gateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateScheduled: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"] },
  },
  { timestamps: true }
);

const Gate = new mongoose.model("Gate", gateSchema);

export default Gate;
