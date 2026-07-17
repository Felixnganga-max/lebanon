import { Router } from "express";
import {
  login,
  refresh,
  logout,
  logoutAllDevices,
  changePassword,
  getMe,
  createStaff,
  listStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/auth.controller.js";
import protect from "../middleware/authenticate.js";
import restrictTo from "../middleware/restrictTo.js";
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

// Staff management — super_admin/admin only, so an editor can't create
// more accounts or promote themselves.
const staffOnly = [protect, restrictTo("super_admin", "admin")];

// POST /api/auth/admin/staff
router.post("/admin/staff", ...staffOnly, createStaff);

// GET /api/auth/admin/staff
router.get("/admin/staff", ...staffOnly, listStaff);

// PATCH /api/auth/admin/staff/:id — body: { isActive?, role? }
router.patch("/admin/staff/:id", ...staffOnly, updateStaff);

// DELETE /api/auth/admin/staff/:id
router.delete("/admin/staff/:id", ...staffOnly, deleteStaff);

export default router;
