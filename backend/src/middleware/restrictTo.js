import sendError from "../utils/sendError.js";

// Composes after protect — req.user must already be set.
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 403, "You don't have permission to do that.");
    }
    next();
  };
}

export default restrictTo;
