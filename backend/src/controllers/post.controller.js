import Post from "../models/Post.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import slugify, { uniqueSlug } from "../utils/slugify.js";
import { uploadBuffer, deleteAsset } from "../utils/cloudinary.js";
import sanitizeBody from "../utils/sanitizeBody.js";

// Derived, never stored — recomputed from the body's word count every time
// a post is served, so it can never drift out of sync with edits.
function withReadTime(post) {
  const obj = post.toObject ? post.toObject() : { ...post };
  const words = obj.body ? obj.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0;
  obj.readTime = `${Math.max(1, Math.round(words / 200))} min read`;
  return obj;
}

// GET /api/posts — public (published only); an authenticated admin/staff
// session also sees drafts, same optionalAuthenticate pattern as programs.
export const listPosts = catchAsync(async (req, res) => {
  const filter = req.user ? {} : { status: "published" };
  if (req.query.status && req.user) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === "true") filter.featured = true;

  const posts = await Post.find(filter)
    .populate("author", "name")
    .sort({ publishedAt: -1, createdAt: -1 });

  // readTime needs the body's word count, but the body itself is dropped
  // from the list response — list views only ever show the excerpt.
  const shaped = posts.map((p) => {
    const obj = withReadTime(p);
    delete obj.body;
    return obj;
  });

  return sendSuccess(res, { posts: shaped });
});

// GET /api/posts/:slug — public (published only unless authenticated).
// Increments viewCount only for genuine public reads, not admin previews,
// and not repeat loads within the same browser session (frontend passes
// ?noCount=true once sessionStorage shows this slug was already counted).
export const getPostBySlug = catchAsync(async (req, res) => {
  const filter = { slug: req.params.slug };
  if (!req.user) filter.status = "published";

  const shouldCount = !req.user && req.query.noCount !== "true";
  const update = shouldCount ? { $inc: { viewCount: 1 } } : {};
  const post = await Post.findOneAndUpdate(filter, update, { new: true }).populate(
    "author",
    "name",
  );

  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  return sendSuccess(res, { post: withReadTime(post) });
});

// POST /api/posts — admin only, multipart (coverImage)
export const createPost = catchAsync(async (req, res) => {
  const { title, excerpt, category, body, status, featured } = req.body;

  if (!title || !excerpt || !category || !body) {
    return sendError(res, 400, "Title, excerpt, category, and body are required.");
  }

  if (!req.file) {
    return sendError(res, 400, "A cover image is required.");
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: "lttc/posts",
    resourceType: "image",
  });

  const base = slugify(title);
  const slug = await uniqueSlug(base, (candidate) => Post.exists({ slug: candidate }));

  const isPublished = status === "published";

  const post = await Post.create({
    title,
    slug,
    excerpt,
    category,
    body: sanitizeBody(body),
    coverImage: result.secure_url,
    coverImagePublicId: result.public_id,
    status: isPublished ? "published" : "draft",
    featured: featured === "true" || featured === true,
    author: req.user.userId,
    publishedAt: isPublished ? new Date() : null,
  });

  return sendSuccess(res, { post: withReadTime(post) }, "Post created.", 201);
});

// PUT /api/posts/:id — admin only
export const updatePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  const { title, excerpt, category, body, status, featured } = req.body;

  if (title && title !== post.title) {
    const base = slugify(title);
    post.slug = await uniqueSlug(base, async (candidate) => {
      const existing = await Post.findOne({ slug: candidate });
      return existing && String(existing._id) !== String(post._id);
    });
    post.title = title;
  }

  if (excerpt !== undefined) post.excerpt = excerpt;
  if (category !== undefined) post.category = category;
  if (body !== undefined) post.body = sanitizeBody(body);

  if (status !== undefined) {
    const wasPublished = post.status === "published";
    post.status = status;
    if (status === "published" && !wasPublished) post.publishedAt = new Date();
  }

  if (featured !== undefined) {
    post.featured = featured === "true" || featured === true;
  }

  if (req.file) {
    const result = await uploadBuffer(req.file.buffer, {
      folder: "lttc/posts",
      resourceType: "image",
    });
    if (post.coverImagePublicId) {
      await deleteAsset(post.coverImagePublicId, "image");
    }
    post.coverImage = result.secure_url;
    post.coverImagePublicId = result.public_id;
  }

  await post.save();

  return sendSuccess(res, { post: withReadTime(post) }, "Post updated.");
});

// POST /api/posts/upload-image — admin only, multipart. Used by the TipTap
// editor's "insert image" toolbar button — uploads straight to Cloudinary
// and returns a URL to embed inline, independent of any specific post
// (a post's body can reference several of these before the post is saved).
export const uploadInlineImage = catchAsync(async (req, res) => {
  if (!req.file) {
    return sendError(res, 400, "An image file is required.");
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: "lttc/posts/inline",
    resourceType: "image",
  });

  return sendSuccess(res, { url: result.secure_url }, "Image uploaded.", 201);
});

// DELETE /api/posts/:id — admin only
export const deletePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return sendError(res, 404, "Post not found.");
  }

  if (post.coverImagePublicId) {
    await deleteAsset(post.coverImagePublicId, "image");
  }
  await post.deleteOne();

  return sendSuccess(res, null, "Post deleted.");
});
