import { Router } from "express";
import { submitApplication } from "../controllers/applicationController.js";

const router = Router();

// POST /api/applications
router.post("/", submitApplication);

export default router;
