import Student from "../models/Student.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  refreshCookieOptions,
} from "../utils/tokens.js";

// Mirrors auth.controller.js's issueSession/login/refresh/logout exactly —
// same refresh-token rotation model, just against the Student collection
// and a differently-named cookie ("studentRefreshToken") so an admin and a
// student session in the same browser never collide (both live under the
// same cookie path, "/api/auth").
const REFRESH_COOKIE_NAME = "studentRefreshToken";

async function issueSession(res, student) {
  const accessToken = signAccessToken({
    userId: student._id,
    role: "student",
    schoolId: null,
    tokenVersion: student.tokenVersion,
  });
  const refreshToken = signRefreshToken({
    userId: student._id,
    tokenVersion: student.tokenVersion,
  });

  student.currentRefreshTokenHash = hashToken(refreshToken);
  await student.save();

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions());

  return accessToken;
}

function shapeStudent(student) {
  return {
    id: student._id,
    name: student.name,
    email: student.email,
    phone: student.phone,
  };
}

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, "Email and password are required.");
  }

  const student = await Student.findOne({ email: email.toLowerCase() }).select("+password");

  if (!student || !student.isActive || !(await student.comparePassword(password))) {
    return sendError(res, 401, "Invalid email or password.");
  }

  const accessToken = await issueSession(res, student);

  return sendSuccess(res, { accessToken, student: shapeStudent(student) });
});

export const refresh = catchAsync(async (req, res) => {
  const incoming = req.cookies?.[REFRESH_COOKIE_NAME];

  if (!incoming) {
    return sendError(res, 401, "Refresh token missing.", "NO_REFRESH_TOKEN");
  }

  let payload;
  try {
    payload = verifyRefreshToken(incoming);
  } catch {
    res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());
    return sendError(res, 401, "Invalid or expired refresh token.", "REFRESH_INVALID");
  }

  const student = await Student.findById(payload.userId).select("+currentRefreshTokenHash");

  if (!student || !student.isActive) {
    res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());
    return sendError(res, 401, "Invalid session.", "REFRESH_INVALID");
  }

  if (student.tokenVersion !== payload.tokenVersion) {
    res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());
    return sendError(res, 401, "Session expired. Please sign in again.", "REFRESH_INVALID");
  }

  if (student.currentRefreshTokenHash !== hashToken(incoming)) {
    student.tokenVersion += 1;
    student.currentRefreshTokenHash = null;
    await student.save();
    res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());
    return sendError(
      res,
      401,
      "Session invalidated for security. Please sign in again.",
      "REFRESH_REUSE_DETECTED",
    );
  }

  const accessToken = await issueSession(res, student);

  return sendSuccess(res, { accessToken });
});

export const logout = catchAsync(async (req, res) => {
  const student = await Student.findById(req.student.userId);

  if (student) {
    student.tokenVersion += 1;
    student.currentRefreshTokenHash = null;
    await student.save();
  }

  res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());

  return sendSuccess(res, null, "Logged out.");
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return sendError(res, 400, "Current and new password are required.");
  }

  if (newPassword.length < 8) {
    return sendError(res, 400, "New password must be at least 8 characters.");
  }

  const student = await Student.findById(req.student.userId).select("+password");

  if (!student || !student.isActive) {
    return sendError(res, 401, "Invalid session.");
  }

  if (!(await student.comparePassword(currentPassword))) {
    return sendError(res, 401, "Current password is incorrect.");
  }

  student.password = newPassword;
  student.tokenVersion += 1;
  const accessToken = await issueSession(res, student);

  return sendSuccess(res, { accessToken }, "Password changed successfully.");
});

export const getMe = catchAsync(async (req, res) => {
  const student = await Student.findById(req.student.userId);

  if (!student || !student.isActive) {
    return sendError(res, 401, "Invalid session.");
  }

  return sendSuccess(res, { student: shapeStudent(student) });
});
