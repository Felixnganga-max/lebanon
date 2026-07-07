import sendError from "../utils/sendError.js";
import { verifyAccessToken } from "../utils/tokens.js";

// Verifies the short-lived access token from the Authorization header and
// attaches req.user. Stateless by design (no DB lookup) — that's the whole
// point of a 15-minute access token; revocation (logout, password change,
// suspected compromise) is enforced on /api/auth/refresh via tokenVersion,
// so the worst case is a revoked admin staying valid for up to 15 minutes.
export function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return sendError(res, 401, "Authentication required.", "NO_TOKEN");
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      userId: payload.userId,
      role: payload.role,
      schoolId: payload.schoolId ?? null,
    };
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return sendError(res, 401, "Access token expired.", "TOKEN_EXPIRED");
    }
    return sendError(res, 401, "Invalid authentication token.", "TOKEN_INVALID");
  }
}

export default protect;
