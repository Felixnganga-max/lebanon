import { Router } from "express";
import {
  listPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  uploadInlineImage,
} from "../controllers/post.controller.js";
import { submitComment, listCommentsForPost } from "../controllers/comment.controller.js";
import { react, getCounts } from "../controllers/reaction.controller.js";
import authenticate from "../middleware/authenticate.js";
import optionalAuthenticate from "../middleware/optionalAuthenticate.js";
import upload from "../middleware/upload.js";

const router = Router();

// GET /api/posts — public, drafts only visible when authenticated
router.get("/", optionalAuthenticate, listPosts);

// GET /api/posts/:slug — public
router.get("/:slug", optionalAuthenticate, getPostBySlug);

// GET /api/posts/:slug/comments — public, approved only
router.get("/:slug/comments", listCommentsForPost);

// POST /api/posts/:slug/comments — public, always pending
router.post("/:slug/comments", submitComment);

// GET /api/posts/:slug/react — public, ?visitorId=
router.get("/:slug/react", getCounts);

// POST /api/posts/:slug/react — public, body: { visitorId, type }
router.post("/:slug/react", react);

router.use(authenticate);

// POST /api/posts/upload-image — admin, multipart, for the editor's inline image button
router.post("/upload-image", upload.single("image"), uploadInlineImage);

// POST /api/posts — admin, multipart (coverImage)
router.post("/", upload.single("coverImage"), createPost);

// PUT /api/posts/:id — admin
router.put("/:id", upload.single("coverImage"), updatePost);

// DELETE /api/posts/:id — admin
router.delete("/:id", deletePost);

export default router;
