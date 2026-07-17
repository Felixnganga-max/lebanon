import sendError from "../utils/sendError.js";
import { verifyAccessToken } from "../utils/tokens.js";

// Mirrors authenticate.js exactly, but requires role:"student" in the
// token payload and attaches req.student instead of req.user — kept as a
// separate middleware (rather than branching authenticate.js) so an admin
// access token can never accidentally be accepted on a student-only route.
export function protectStudent(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return sendError(res, 401, "Authentication required.", "NO_TOKEN");
  }

  try {
    const payload = verifyAccessToken(token);
    if (payload.role !== "student") {
      return sendError(res, 401, "Invalid authentication token.", "TOKEN_INVALID");
    }
    req.student = { userId: payload.userId };
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendError(res, 401, "Access token expired.", "TOKEN_EXPIRED");
    }
    return sendError(res, 401, "Invalid authentication token.", "TOKEN_INVALID");
  }
}

export default protectStudent;
