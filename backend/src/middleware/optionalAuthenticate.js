import { verifyAccessToken } from "../utils/tokens.js";

const ADMIN_ROLES = new Set(["super_admin", "admin", "editor"]);

// Like protect, but never blocks the request — used on public GET routes
// that reveal more (e.g. inactive/hidden records, draft posts) when the
// caller is a logged-in admin, per public GET /api/programs, /api/categories,
// /api/posts. Only ever attaches req.user for an admin-role token — a
// student's token (same JWT secret, role:"student") must fall through as
// anonymous here too, or a logged-in student could pull draft/inactive
// content meant for staff eyes only.
export function optionalAuthenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next();

  try {
    const payload = verifyAccessToken(token);
    if (ADMIN_ROLES.has(payload.role)) {
      req.user = {
        userId: payload.userId,
        role: payload.role,
        schoolId: payload.schoolId ?? null,
      };
    }
  } catch {
    // Invalid/expired token on a public route — just proceed as anonymous.
  }

  next();
}

export default optionalAuthenticate;
