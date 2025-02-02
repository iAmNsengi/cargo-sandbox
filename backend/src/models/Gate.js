import mongoose from "mongoose";

const gateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dateScheduled: { type: String, required: true },
    status: { type: String, enum: ["open", "closed"] },
  },
  { timestamps: true }
);

// Add indexes for date-based queries and status
gateSchema.index({ dateScheduled: 1 });
gateSchema.index({ status: 1 });
gateSchema.index({ name: 1 });

const Gate = new mongoose.model("Gate", gateSchema);

export default Gate;
