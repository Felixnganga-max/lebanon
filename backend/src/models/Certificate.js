import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    studentName: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    graduationDate: { type: String, required: true, trim: true },
    hasQRCode: { type: Boolean, default: false },
    qrCodeUrl: { type: String },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true },
);

export default mongoose.model("Certificate", certificateSchema);
