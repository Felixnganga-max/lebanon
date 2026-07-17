import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";
import Program from "../models/Program.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";

// POST /api/enrollments — admin only, body: { studentId, programId }
export const createEnrollment = catchAsync(async (req, res) => {
  const { studentId, programId } = req.body;

  if (!studentId || !programId) {
    return sendError(res, 400, "studentId and programId are required.");
  }

  const [student, program] = await Promise.all([
    Student.findById(studentId),
    Program.findById(programId),
  ]);

  if (!student) return sendError(res, 404, "Student not found.");
  if (!program) return sendError(res, 404, "Program not found.");

  const existing = await Enrollment.findOne({ studentId, programId });
  if (existing) {
    return sendError(res, 409, "This student is already enrolled in that program.");
  }

  const enrollment = await Enrollment.create({ studentId, programId });
  await enrollment.populate("programId", "title slug image duration");

  return sendSuccess(res, { enrollment }, "Student enrolled.", 201);
});

// PATCH /api/enrollments/:id — admin only, body: { status?, progress? }
export const updateEnrollment = catchAsync(async (req, res) => {
  const { status, progress } = req.body;
  const VALID_STATUSES = ["enrolled", "in_progress", "completed", "withdrawn"];

  const enrollment = await Enrollment.findById(req.params.id);
  if (!enrollment) {
    return sendError(res, 404, "Enrollment not found.");
  }

  if (status !== undefined) {
    if (!VALID_STATUSES.includes(status)) {
      return sendError(res, 400, `status must be one of: ${VALID_STATUSES.join(", ")}`);
    }
    enrollment.status = status;
  }

  if (progress !== undefined) {
    const num = Number(progress);
    if (Number.isNaN(num) || num < 0 || num > 100) {
      return sendError(res, 400, "progress must be a number between 0 and 100.");
    }
    enrollment.progress = num;
  }

  await enrollment.save();
  await enrollment.populate("programId", "title slug image duration");

  return sendSuccess(res, { enrollment }, "Enrollment updated.");
});

// DELETE /api/enrollments/:id — admin only
export const deleteEnrollment = catchAsync(async (req, res) => {
  const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
  if (!enrollment) {
    return sendError(res, 404, "Enrollment not found.");
  }
  return sendSuccess(res, null, "Enrollment removed.");
});

// GET /api/enrollments/me — student-scoped, populates program details for the portal dashboard
export const getMyEnrollments = catchAsync(async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: req.student.userId })
    .populate("programId")
    .sort({ enrolledAt: -1 });

  return sendSuccess(res, { enrollments });
});
