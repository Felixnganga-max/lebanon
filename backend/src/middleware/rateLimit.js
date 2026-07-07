import rateLimit from "express-rate-limit";
import sendError from "../utils/sendError.js";

// Applied to /api/auth/admin/login and /api/auth/admin/refresh — both are
// brute-force/guessing targets (password, refresh token) so are limited
// harder than the rest of the API.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    sendError(
      res,
      429,
      "Too many attempts. Please try again later.",
      "RATE_LIMITED",
    ),
});

export default authLimiter;
