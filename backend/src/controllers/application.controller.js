import Application from "../models/Application.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";

const PAGE_SIZE = 20;

// GET /api/applications — admin only
// ?status= & ?program= & ?q= (name/email search) & ?page=
export const listApplications = catchAsync(async (req, res) => {
  const { status, program, q, page = 1 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (program) filter.program = program;
  if (q) {
    const re = new RegExp(q.trim(), "i");
    filter.$or = [{ firstName: re }, { lastName: re }, { email: re }];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE),
    Application.countDocuments(filter),
  ]);

  return sendSuccess(res, {
    applications,
    total,
    page: pageNum,
    pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  });
});

// GET /api/applications/:id — admin only
export const getApplication = catchAsync(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) {
    return sendError(res, 404, "Application not found.");
  }
  return sendSuccess(res, { application });
});

// PATCH /api/applications/:id — admin only, body: { status }
export const updateApplicationStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const VALID = ["new", "reviewed", "shortlisted", "accepted", "rejected"];

  if (!status || !VALID.includes(status)) {
    return sendError(res, 400, `status must be one of: ${VALID.join(", ")}`);
  }

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );

  if (!application) {
    return sendError(res, 404, "Application not found.");
  }

  return sendSuccess(res, { application }, "Application updated.");
});

// DELETE /api/applications/:id — admin only
export const deleteApplication = catchAsync(async (req, res) => {
  const application = await Application.findByIdAndDelete(req.params.id);
  if (!application) {
    return sendError(res, 404, "Application not found.");
  }
  return sendSuccess(res, null, "Application deleted.");
});
