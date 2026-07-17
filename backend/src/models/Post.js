import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    coverImagePublicId: { type: String, required: true },
    // Rich HTML from the TipTap editor — sanitized server-side before save
    // (see sanitize-html usage in post.controller.js) so stored content can
    // never carry scripts even though only authenticated staff write it.
    body: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    featured: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    viewCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("Post", postSchema);
