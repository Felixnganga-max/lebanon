import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    image: { type: String, required: true },
    duration: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    fee: { type: String, required: true, trim: true },
    suitable: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    learningOutcomes: { type: [String], default: [] },
    curriculum: { type: [String], default: [] },
    careerPaths: { type: [String], default: [] },
    certification: { type: String, required: true, trim: true },
    // Only present for the few programs with a scheduled intake — no
    // default, so it's genuinely absent rather than an empty string.
    dates: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Program", programSchema);
