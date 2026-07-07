import { verifyAccessToken } from "../utils/tokens.js";

// Like protect, but never blocks the request — used on public GET routes
// that reveal more (e.g. inactive/hidden records) when the caller is a
// logged-in admin, per public GET /api/programs & /api/categories.
export function optionalAuthenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next();

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      userId: payload.userId,
      role: payload.role,
      schoolId: payload.schoolId ?? null,
    };
  } catch {
    // Invalid/expired token on a public route — just proceed as anonymous.
  }

  next();
}

export default optionalAuthenticate;
