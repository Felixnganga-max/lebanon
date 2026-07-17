import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Mirrors Admin.js's auth mechanics exactly (separate collection, separate
// refresh-token cookie name) so the login/refresh/rotation logic can be
// reused verbatim in studentAuth.controller.js.
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    tokenVersion: { type: Number, default: 0 },
    currentRefreshTokenHash: { type: String, default: null, select: false },
  },
  { timestamps: true },
);

studentSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

studentSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("Student", studentSchema);
