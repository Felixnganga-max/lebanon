import Reaction from "../models/Reaction.js";
import Post from "../models/Post.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";

async function countsFor(postId, visitorId) {
  const [likes, dislikes, mine] = await Promise.all([
    Reaction.countDocuments({ postId, type: "like" }),
    Reaction.countDocuments({ postId, type: "dislike" }),
    visitorId ? Reaction.findOne({ postId, visitorId }) : null,
  ]);
  return { likes, dislikes, myReaction: mine?.type || null };
}

// POST /api/posts/:slug/react — public, body: { visitorId, type }
// Upserts by (postId, visitorId): a repeat visitor's vote replaces their
// old one, and sending the same type again clears it (toggle-off) — no
// account required, just a client-generated visitorId persisted locally.
export const react = catchAsync(async (req, res) => {
  const { visitorId, type } = req.body;

  if (!visitorId || !["like", "dislike"].includes(type)) {
    return sendError(res, 400, "visitorId and a valid type (like/dislike) are required.");
  }

  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  const existing = await Reaction.findOne({ postId: post._id, visitorId });

  if (existing && existing.type === type) {
    await existing.deleteOne();
  } else if (existing) {
    existing.type = type;
    await existing.save();
  } else {
    await Reaction.create({ postId: post._id, visitorId, type });
  }

  return sendSuccess(res, await countsFor(post._id, visitorId));
});

// GET /api/posts/:slug/react — public, ?visitorId= optional
export const getCounts = catchAsync(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  return sendSuccess(res, await countsFor(post._id, req.query.visitorId));
});
