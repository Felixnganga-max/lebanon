import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    // Anonymous per-browser id (a UUID the frontend generates once and
    // persists in localStorage) — lets a visitor's vote be found and
    // changed without requiring an account.
    visitorId: { type: String, required: true },
    type: { type: String, enum: ["like", "dislike"], required: true },
  },
  { timestamps: true },
);

// One active reaction per visitor per post — react() upserts against this.
reactionSchema.index({ postId: 1, visitorId: 1 }, { unique: true });

export default mongoose.model("Reaction", reactionSchema);
