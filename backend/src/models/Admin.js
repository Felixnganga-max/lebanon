import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
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
    role: {
      type: String,
      enum: ["super_admin", "admin", "editor"],
      default: "admin",
    },
    isActive: { type: Boolean, default: true },
    // Nullable until multi-tenant schools are introduced — carried in the
    // access token payload now so downstream authorization logic doesn't
    // need another schema migration when that lands.
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", default: null },
    // Bumped to invalidate every outstanding refresh token at once (logout
    // everywhere, password change, suspected compromise).
    tokenVersion: { type: Number, default: 0 },
    // SHA-256 of the single currently-valid refresh token, so reuse of an
    // already-rotated token (the compromise signal) can be detected without
    // ever storing the raw token itself.
    currentRefreshTokenHash: { type: String, default: null, select: false },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("Admin", adminSchema);
