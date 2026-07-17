import { Router } from "express";
import {
  createStudent,
  listStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

// Every student-management endpoint is admin-only.
router.use(authenticate);

router.post("/", createStudent);
router.get("/", listStudents);
router.get("/:id", getStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
