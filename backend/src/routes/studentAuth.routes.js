import { Router } from "express";
import {
  login,
  refresh,
  logout,
  changePassword,
  getMe,
} from "../controllers/studentAuth.controller.js";
import protectStudent from "../middleware/authenticateStudent.js";
import authLimiter from "../middleware/rateLimit.js";

const router = Router();

// POST /api/auth/student/login
router.post("/login", authLimiter, login);

// POST /api/auth/student/refresh
router.post("/refresh", authLimiter, refresh);

// POST /api/auth/student/logout
router.post("/logout", protectStudent, logout);

// POST /api/auth/student/change-password
router.post("/change-password", protectStudent, authLimiter, changePassword);

// GET /api/auth/student/me
router.get("/me", protectStudent, getMe);

export default router;
