import sendError from "../utils/sendError.js";
import { verifyAccessToken } from "../utils/tokens.js";

const ADMIN_ROLES = new Set(["super_admin", "admin", "editor"]);

// Verifies the short-lived access token from the Authorization header and
// attaches req.user. Stateless by design (no DB lookup) — that's the whole
// point of a 15-minute access token; revocation (logout, password change,
// suspected compromise) is enforced on /api/auth/refresh via tokenVersion,
// so the worst case is a revoked admin staying valid for up to 15 minutes.
//
// Student tokens are signed with the same JWT secret (see
// studentAuth.controller.js) but carry role:"student" — every admin route
// funnels through this one middleware, so rejecting non-admin roles here
// is what keeps a student's token from reaching any admin endpoint that
// doesn't have its own extra role check.
export function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return sendError(res, 401, "Authentication required.", "NO_TOKEN");
  }

  try {
    const payload = verifyAccessToken(token);
    if (!ADMIN_ROLES.has(payload.role)) {
      return sendError(res, 401, "Invalid authentication token.", "TOKEN_INVALID");
    }
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
