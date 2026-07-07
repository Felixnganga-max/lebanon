import { Router } from "express";
import {
  login,
  refresh,
  logout,
  logoutAllDevices,
  changePassword,
  getMe,
} from "../controllers/auth.controller.js";
import protect from "../middleware/authenticate.js";
import authLimiter from "../middleware/rateLimit.js";

const router = Router();

// POST /api/auth/admin/login — issues access token (body) + refresh cookie
router.post("/admin/login", authLimiter, login);

// POST /api/auth/admin/refresh — rotates refresh cookie, issues new access token
router.post("/admin/refresh", authLimiter, refresh);

// POST /api/auth/admin/logout — clears refresh cookie, invalidates tokenVersion
router.post("/admin/logout", protect, logout);

// POST /api/auth/admin/logout-all-devices — explicit "log out everywhere"
router.post("/admin/logout-all-devices", protect, logoutAllDevices);

// POST /api/auth/admin/change-password — rate-limited like login, since it's
// also a brute-force target (guessing the current password)
router.post("/admin/change-password", protect, authLimiter, changePassword);

// GET /api/auth/admin/me
router.get("/admin/me", protect, getMe);

export default router;
