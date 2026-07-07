import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Fee Structure",
        "Job Advert",
        "School Policy",
        "Legal Document",
        "Accreditation Certificate",
        "Other",
      ],
    },
    fileUrl: { type: String, required: true },
    filePublicId: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    description: { type: String, trim: true },
    isPublic: { type: Boolean, default: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
);

export default mongoose.model("Document", documentSchema);
