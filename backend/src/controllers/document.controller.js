import Document from "../models/Document.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import { uploadBuffer, deleteAsset } from "../utils/cloudinary.js";

// GET /api/documents — public, only isPublic:true, optional ?category=
export const listDocuments = catchAsync(async (req, res) => {
  const filter = { isPublic: true };
  if (req.query.category) filter.category = req.query.category;

  console.log("[listDocuments] Document.find filter:", filter);

  let documents;
  try {
    documents = await Document.find(filter).sort({ createdAt: -1 });
  } catch (err) {
    console.error("[listDocuments] Mongoose query failed. filter:", filter);
    console.error("[listDocuments] error.message:", err.message);
    console.error("[listDocuments] error.stack:", err.stack);
    if (err.name === "ValidationError") {
      console.error("[listDocuments] error.errors:", err.errors);
    }
    throw err;
  }

  return sendSuccess(res, { documents });
});

// POST /api/documents — admin only, multipart upload → Cloudinary → save
export const createDocument = catchAsync(async (req, res) => {
  const { title, category, description, isPublic } = req.body;

  if (!title || !category) {
    return sendError(res, 400, "Title and category are required.");
  }

  if (!req.file) {
    return sendError(res, 400, "A file is required.");
  }

  console.log("[createDocument] req.user:", req.user);

  const uploadParams = {
    folder: "lttc/documents",
    resourceType: "auto",
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
  };
  console.log("[createDocument] Cloudinary upload params:", uploadParams);

  let result;
  try {
    result = await uploadBuffer(req.file.buffer, {
      folder: "lttc/documents",
      resourceType: "auto",
    });
  } catch (err) {
    console.error("[createDocument] Cloudinary upload failed. params:", uploadParams);
    console.error("[createDocument] Cloudinary raw error:", err);
    console.error("[createDocument] error.message:", err.message);
    console.error("[createDocument] error.stack:", err.stack);
    throw err;
  }

  const documentParams = {
    title,
    category,
    description,
    isPublic: isPublic === undefined ? true : isPublic === "true" || isPublic === true,
    fileUrl: result.secure_url,
    filePublicId: result.public_id,
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    uploadedBy: req.user.userId,
  };
  console.log("[createDocument] Document.create params:", documentParams);

  let document;
  try {
    document = await Document.create(documentParams);
  } catch (err) {
    console.error("[createDocument] Mongoose create failed. params:", documentParams);
    console.error("[createDocument] error.message:", err.message);
    console.error("[createDocument] error.stack:", err.stack);
    if (err.name === "ValidationError") {
      console.error("[createDocument] error.errors:", err.errors);
    }
    throw err;
  }

  return sendSuccess(res, { document }, "Document uploaded.", 201);
});

// DELETE /api/documents/:id — admin only, also removes the Cloudinary asset
export const deleteDocument = catchAsync(async (req, res) => {
  const document = await Document.findByIdAndDelete(req.params.id);

  if (!document) {
    return sendError(res, 404, "Document not found.");
  }

  await deleteAsset(document.filePublicId);

  return sendSuccess(res, null, "Document deleted.");
});
