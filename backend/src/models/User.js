import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSChema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minLength: 8 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["trainee", "coach", "admin"] },
    default: "trainee",
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// hash the password before saving
userSChema.pre("save", async function (next) {
  if (!this.isModified) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// check passowrd
userSChema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = new mongoose.model("User", userSChema);

export default User;
