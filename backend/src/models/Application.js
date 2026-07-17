import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    idNumber: { type: String, trim: true },
    county: { type: String, trim: true },
    employer: { type: String, trim: true },
    motivation: { type: String, trim: true },
    heard: { type: String, trim: true },
    // Free-text school/program names, matching exactly what the Apply
    // wizard already sends (cat.label / selectedProg) — not a ref, since
    // the wizard has always submitted display strings, not ids.
    school: { type: String, trim: true },
    program: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "reviewed", "shortlisted", "accepted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Application", applicationSchema);
