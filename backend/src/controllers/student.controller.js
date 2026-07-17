import Student from "../models/Student.js";
import Enrollment from "../models/Enrollment.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";

function shapeStudent(student) {
  return {
    id: student._id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    isActive: student.isActive,
    createdAt: student.createdAt,
  };
}

// POST /api/students — admin only
export const createStudent = catchAsync(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return sendError(res, 400, "Name, email, and password are required.");
  }

  if (password.length < 8) {
    return sendError(res, 400, "Password must be at least 8 characters.");
  }

  const existing = await Student.findOne({ email: email.toLowerCase() });
  if (existing) {
    return sendError(res, 409, "A student with that email already exists.");
  }

  const student = await Student.create({
    name,
    email,
    password,
    phone,
    createdBy: req.user.userId,
  });

  return sendSuccess(res, { student: shapeStudent(student) }, "Student created.", 201);
});

// GET /api/students — admin only, ?q= search by name/email
export const listStudents = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.q) {
    const re = new RegExp(req.query.q.trim(), "i");
    filter.$or = [{ name: re }, { email: re }];
  }

  const students = await Student.find(filter).sort({ createdAt: -1 });

  return sendSuccess(res, { students: students.map(shapeStudent) });
});

// GET /api/students/:id — admin only, includes their enrollments
export const getStudent = catchAsync(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return sendError(res, 404, "Student not found.");
  }

  const enrollments = await Enrollment.find({ studentId: student._id })
    .populate("programId", "title slug image duration")
    .sort({ enrolledAt: -1 });

  return sendSuccess(res, { student: shapeStudent(student), enrollments });
});

// PATCH /api/students/:id — admin only, body: { name?, phone?, isActive? }
export const updateStudent = catchAsync(async (req, res) => {
  const { name, phone, isActive } = req.body;

  const student = await Student.findById(req.params.id);
  if (!student) {
    return sendError(res, 404, "Student not found.");
  }

  if (name !== undefined) student.name = name;
  if (phone !== undefined) student.phone = phone;
  if (isActive !== undefined) student.isActive = isActive;

  await student.save();

  return sendSuccess(res, { student: shapeStudent(student) }, "Student updated.");
});

// DELETE /api/students/:id — admin only, cascades their enrollments
export const deleteStudent = catchAsync(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return sendError(res, 404, "Student not found.");
  }

  await Enrollment.deleteMany({ studentId: student._id });

  return sendSuccess(res, null, "Student deleted.");
});
