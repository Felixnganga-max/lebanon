import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";

// POST /api/posts/:slug/comments — public, always lands as status: pending
export const submitComment = catchAsync(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return sendError(res, 400, "Name, email, and message are required.");
  }

  const post = await Post.findOne({ slug: req.params.slug, status: "published" });
  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  const comment = await Comment.create({
    postId: post._id,
    name,
    email,
    message,
  });

  return sendSuccess(res, { comment }, "Comment submitted for review.", 201);
});

// GET /api/posts/:slug/comments — public, approved only
export const listCommentsForPost = catchAsync(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  const comments = await Comment.find({ postId: post._id, status: "approved" }).sort({
    createdAt: -1,
  });

  return sendSuccess(res, { comments });
});

// GET /api/comments — admin only, ?status= filter, cross-post moderation queue
export const listAllComments = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const comments = await Comment.find(filter)
    .populate("postId", "title slug")
    .sort({ createdAt: -1 });

  return sendSuccess(res, { comments });
});

// PATCH /api/comments/:id — admin only, body: { status }
export const moderateComment = catchAsync(async (req, res) => {
  const { status } = req.body;
  const VALID = ["pending", "approved", "rejected"];

  if (!status || !VALID.includes(status)) {
    return sendError(res, 400, `status must be one of: ${VALID.join(", ")}`);
  }

  const comment = await Comment.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!comment) {
    return sendError(res, 404, "Comment not found.");
  }

  return sendSuccess(res, { comment }, "Comment updated.");
});

// DELETE /api/comments/:id — admin only
export const deleteComment = catchAsync(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) {
    return sendError(res, 404, "Comment not found.");
  }
  return sendSuccess(res, null, "Comment deleted.");
});
