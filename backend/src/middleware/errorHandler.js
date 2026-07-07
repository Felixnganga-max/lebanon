import multer from "multer";
import sendError from "../utils/sendError.js";

// Centralized error handler — every catchAsync-wrapped controller funnels
// its rejections here via next(err) instead of crashing the process.
export function errorHandler(err, req, res, next) {
  console.error(`[errorHandler] ${req.method} ${req.originalUrl}`);
  console.error("[errorHandler] error.name:", err.name);
  console.error("[errorHandler] error.message:", err.message);
  console.error("[errorHandler] error.stack:", err.stack);
  if (err.name === "ValidationError") {
    console.error("[errorHandler] error.errors:", err.errors);
  }

  if (err instanceof multer.MulterError) {
    return sendError(res, 400, err.message);
  }

  if (err.message === "Unsupported file type.") {
    return sendError(res, 400, err.message);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return sendError(res, 409, `That ${field} is already in use.`);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ");
    return sendError(res, 400, message);
  }

  if (err.name === "CastError") {
    return sendError(res, 400, `Invalid ${err.path}.`);
  }

  return sendError(res, 500, "Something went wrong. Please try again.");
}

export default errorHandler;
