import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program", required: true },
    status: {
      type: String,
      enum: ["enrolled", "in_progress", "completed", "withdrawn"],
      default: "enrolled",
    },
    // Admin-set for now — there's no course-content-consumption system yet
    // to compute this automatically from.
    progress: { type: Number, default: 0, min: 0, max: 100 },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// A student can only be enrolled once per program.
enrollmentSchema.index({ studentId: 1, programId: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
