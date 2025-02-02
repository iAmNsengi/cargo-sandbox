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
        // Admin notifications
        "new_user_registered",
        "system_alert",
        "report_ready",
        "capacity_alert",

        // Coach notifications
        "tracker_reminder",
        "performance_alert",
        "resource_update",
        "team_issue",

        // Trainee notifications
        "gate_scheduled",
        "attendance_warning",
        "feedback_received",
        "resource_added",
        "schedule_reminder",

        // Common notifications
        "announcement",
        "gate_interview",
        "message_received",
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
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

notificationSchema.index({ recipient: 1, read: 1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ type: 1, recipient: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
