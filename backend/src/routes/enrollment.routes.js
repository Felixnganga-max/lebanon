import { Router } from "express";
import {
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getMyEnrollments,
} from "../controllers/enrollment.controller.js";
import authenticate from "../middleware/authenticate.js";
import protectStudent from "../middleware/authenticateStudent.js";

const router = Router();

// GET /api/enrollments/me — student-scoped, for the portal dashboard
router.get("/me", protectStudent, getMyEnrollments);

// POST /api/enrollments — admin only, body: { studentId, programId }
router.post("/", authenticate, createEnrollment);

// PATCH /api/enrollments/:id — admin only, body: { status?, progress? }
router.patch("/:id", authenticate, updateEnrollment);

// DELETE /api/enrollments/:id — admin only
router.delete("/:id", authenticate, deleteEnrollment);

export default router;
