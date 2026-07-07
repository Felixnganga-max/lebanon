import Admin from "../models/Admin.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  truncateToken,
  refreshCookieOptions,
} from "../utils/tokens.js";

// Issues a fresh access+refresh pair for `admin`, persists the refresh
// token's hash as the one-and-only currently-valid token (rotation target),
// and sets the httpOnly cookie. Shared by login and refresh.
async function issueSession(res, admin) {
  const accessToken = signAccessToken({
    userId: admin._id,
    role: admin.role,
    schoolId: admin.schoolId,
    tokenVersion: admin.tokenVersion,
  });
  const refreshToken = signRefreshToken({
    userId: admin._id,
    tokenVersion: admin.tokenVersion,
  });

  admin.currentRefreshTokenHash = hashToken(refreshToken);
  await admin.save();

  res.cookie("refreshToken", refreshToken, refreshCookieOptions());

  return accessToken;
}

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 400, "Email and password are required.");
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );

  if (!admin || !admin.isActive || !(await admin.comparePassword(password))) {
    return sendError(res, 401, "Invalid email or password.");
  }

  const accessToken = await issueSession(res, admin);

  console.log(
    `[audit] login userId=${admin._id} ip=${req.ip} at=${new Date().toISOString()}`,
  );

  return sendSuccess(res, {
    accessToken,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

export const refresh = catchAsync(async (req, res) => {
  const incoming = req.cookies?.refreshToken;

  if (!incoming) {
    return sendError(res, 401, "Refresh token missing.", "NO_REFRESH_TOKEN");
  }

  let payload;
  try {
    payload = verifyRefreshToken(incoming);
  } catch {
    res.clearCookie("refreshToken", refreshCookieOptions());
    return sendError(res, 401, "Invalid or expired refresh token.", "REFRESH_INVALID");
  }

  const admin = await Admin.findById(payload.userId).select("+currentRefreshTokenHash");

  if (!admin || !admin.isActive) {
    res.clearCookie("refreshToken", refreshCookieOptions());
    return sendError(res, 401, "Invalid session.", "REFRESH_INVALID");
  }

  if (admin.tokenVersion !== payload.tokenVersion) {
    res.clearCookie("refreshToken", refreshCookieOptions());
    return sendError(res, 401, "Session expired. Please sign in again.", "REFRESH_INVALID");
  }

  if (admin.currentRefreshTokenHash !== hashToken(incoming)) {
    // This refresh token was valid (right signature, right tokenVersion) but
    // isn't the current one — it was already rotated away by an earlier
    // refresh, so someone is replaying a used token. Kill every session.
    admin.tokenVersion += 1;
    admin.currentRefreshTokenHash = null;
    await admin.save();
    console.error(
      `[audit] refresh token reuse detected userId=${admin._id} ip=${req.ip} ` +
        `token=${truncateToken(incoming)} at=${new Date().toISOString()}`,
    );
    res.clearCookie("refreshToken", refreshCookieOptions());
    return sendError(
      res,
      401,
      "Session invalidated for security. Please sign in again.",
      "REFRESH_REUSE_DETECTED",
    );
  }

  const accessToken = await issueSession(res, admin);

  return sendSuccess(res, { accessToken });
});

export const logout = catchAsync(async (req, res) => {
  const admin = await Admin.findById(req.user.userId);

  if (admin) {
    admin.tokenVersion += 1;
    admin.currentRefreshTokenHash = null;
    await admin.save();
  }

  res.clearCookie("refreshToken", refreshCookieOptions());

  return sendSuccess(res, null, "Logged out.");
});

// Functionally identical to logout in this single-session-per-admin model
// (there's one refresh token slot per admin, not one per device) — kept as
// its own endpoint per spec so the frontend has an explicit, user-facing
// "log out everywhere" action to call from an account security page.
export const logoutAllDevices = catchAsync(async (req, res) => {
  const admin = await Admin.findById(req.user.userId);

  if (admin) {
    admin.tokenVersion += 1;
    admin.currentRefreshTokenHash = null;
    await admin.save();
  }

  res.clearCookie("refreshToken", refreshCookieOptions());

  return sendSuccess(res, null, "Logged out of all devices.");
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return sendError(res, 400, "Current and new password are required.");
  }

  if (newPassword.length < 8) {
    return sendError(res, 400, "New password must be at least 8 characters.");
  }

  const admin = await Admin.findById(req.user.userId).select("+password");

  if (!admin || !admin.isActive) {
    return sendError(res, 401, "Invalid session.");
  }

  if (!(await admin.comparePassword(currentPassword))) {
    return sendError(res, 401, "Current password is incorrect.");
  }

  if (await admin.comparePassword(newPassword)) {
    return sendError(
      res,
      400,
      "New password must be different from the current password.",
    );
  }

  admin.password = newPassword;
  // Bump tokenVersion to invalidate every other outstanding refresh token
  // (same "revoke everything, then re-issue for this session" pattern as
  // logoutAllDevices) — issueSession below re-authenticates *this* request
  // so the admin isn't logged out by their own password change.
  admin.tokenVersion += 1;
  const accessToken = await issueSession(res, admin);

  console.log(
    `[audit] password changed userId=${admin._id} ip=${req.ip} at=${new Date().toISOString()}`,
  );

  return sendSuccess(res, { accessToken }, "Password changed successfully.");
});

export const getMe = catchAsync(async (req, res) => {
  const admin = await Admin.findById(req.user.userId);

  if (!admin || !admin.isActive) {
    return sendError(res, 401, "Invalid session.");
  }

  return sendSuccess(res, {
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});
