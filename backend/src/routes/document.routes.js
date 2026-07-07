import { Router } from "express";
import {
  listDocuments,
  createDocument,
  deleteDocument,
} from "../controllers/document.controller.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";

const router = Router();

// GET /api/documents — public
router.get("/", listDocuments);

// POST /api/documents — admin only, multipart
router.post("/", authenticate, upload.single("file"), createDocument);

// DELETE /api/documents/:id — admin only
router.delete("/:id", authenticate, deleteDocument);

export default router;
