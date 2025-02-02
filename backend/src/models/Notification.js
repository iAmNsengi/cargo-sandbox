import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "gate_scheduled",
        "performance_alert",
        "resource_added",
        "announcement",
        "attendance_warning",
        "feedback_received",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    actionRequired: Boolean,
    actionUrl: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
