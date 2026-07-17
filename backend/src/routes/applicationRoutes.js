import { Router } from "express";
import { submitApplication } from "../controllers/applicationController.js";
import {
  listApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/application.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

// POST /api/applications — public, unchanged
router.post("/", submitApplication);

router.use(authenticate);

// GET /api/applications — admin, ?status= & ?program= & ?q= & ?page=
router.get("/", listApplications);

// GET /api/applications/:id — admin
router.get("/:id", getApplication);

// PATCH /api/applications/:id — admin, body: { status }
router.patch("/:id", updateApplicationStatus);

// DELETE /api/applications/:id — admin
router.delete("/:id", deleteApplication);

export default router;
