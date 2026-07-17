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
    // Course material PDFs/docs attached to this program — embedded rather
    // than a separate collection since each material is owned entirely by
    // one program and never queried independently of it (except the
    // flattened public /materials listing, which just projects this array).
    materials: {
      type: [
        {
          title: { type: String, required: true, trim: true },
          fileUrl: { type: String, required: true },
          filePublicId: { type: String, required: true },
          fileName: { type: String, required: true },
          fileType: { type: String, required: true },
          // Cloudinary's own classification of the uploaded asset (image |
          // raw | video) — destroy() rejects "auto" (upload-only), so this
          // must be captured from the upload response and reused verbatim
          // when the material is deleted.
          resourceType: { type: String, default: "image" },
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Program", programSchema);
