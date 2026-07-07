export function sendError(res, statusCode = 500, message = "Something went wrong", code) {
  const body = { success: false, message };
  if (code) body.code = code;
  return res.status(statusCode).json(body);
}

export default sendError;
