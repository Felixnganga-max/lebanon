import multer from "multer";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

// memoryStorage only — the backend runs as Vercel serverless functions,
// which have no persistent disk, so every upload must go straight to
// Cloudinary from an in-memory buffer rather than touching the filesystem.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error("Unsupported file type."));
    }
    cb(null, true);
  },
});

export default upload;
