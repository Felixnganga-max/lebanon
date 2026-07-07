import mongoose from "mongoose";

/**
 * Connects to MongoDB without ever crashing the process — email routes
 * (applications/contact) don't depend on the DB, so a missing/unreachable
 * MONGODB_URI should only disable DB-backed routes, not the whole server.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[db] MONGODB_URI is not set — skipping DB connection. " +
        "DB-backed routes (auth, categories, programs, documents, certificates) will fail until it's provided.",
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
  }
}

export default connectDB;
