import { Router } from "express";
import {
  listAllComments,
  moderateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.use(authenticate);

// GET /api/comments — admin, ?status= filter, cross-post moderation queue
router.get("/", listAllComments);

// PATCH /api/comments/:id — admin, body: { status }
router.patch("/:id", moderateComment);

// DELETE /api/comments/:id — admin
router.delete("/:id", deleteComment);

export default router;
