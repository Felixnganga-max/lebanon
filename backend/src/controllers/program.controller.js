import Program from "../models/Program.js";
import Category from "../models/Category.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import slugify, { uniqueSlug } from "../utils/slugify.js";
import { uploadBuffer, deleteAsset } from "../utils/cloudinary.js";

// Dynamic-list fields (Learning Outcomes / Curriculum / Career Paths) arrive
// as a real array over JSON, but as a JSON-encoded string over multipart
// form-data (the wire format multer/form-data forces on non-file fields).
function parseListField(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [value];
    } catch {
      return [value];
    }
  }
  return [];
}

function buildProgramFields(body) {
  const fields = {
    title: body.title,
    duration: body.duration,
    mode: body.mode,
    fee: body.fee,
    suitable: body.suitable,
    description: body.description,
    overview: body.overview,
    certification: body.certification,
    learningOutcomes: parseListField(body.learningOutcomes),
    curriculum: parseListField(body.curriculum),
    careerPaths: parseListField(body.careerPaths),
  };
  if (body.categoryId) fields.categoryId = body.categoryId;
  if (body.displayOrder !== undefined) fields.displayOrder = body.displayOrder;
  if (body.isActive !== undefined) fields.isActive = body.isActive === "true" || body.isActive === true;
  if (body.dates) fields.dates = body.dates;
  return fields;
}

// GET /api/programs — public, ?categoryId= or ?categorySlug= (supports
// ?includeInactive=true for logged-in admins managing the catalog)
export const listPrograms = catchAsync(async (req, res) => {
  const filter =
    req.user && req.query.includeInactive === "true" ? {} : { isActive: true };

  if (req.query.categoryId) {
    filter.categoryId = req.query.categoryId;
  } else if (req.query.categorySlug) {
    const category = await Category.findOne({ slug: req.query.categorySlug });
    filter.categoryId = category ? category._id : null;
  }

  const programs = await Program.find(filter)
    .populate("categoryId", "name slug")
    .sort({ displayOrder: 1 });

  return sendSuccess(res, { programs });
});

// GET /api/programs/:slug — public
export const getProgramBySlug = catchAsync(async (req, res) => {
  const program = await Program.findOne({
    slug: req.params.slug,
    isActive: true,
  }).populate("categoryId", "name slug");

  if (!program) {
    return sendError(res, 404, "Program not found.");
  }

  return sendSuccess(res, { program });
});

// POST /api/programs — admin only, multipart if image included, else JSON
export const createProgram = catchAsync(async (req, res) => {
  const fields = buildProgramFields(req.body);

  if (!fields.categoryId) {
    return sendError(res, 400, "categoryId is required.");
  }

  const category = await Category.findById(fields.categoryId);
  if (!category) {
    return sendError(res, 400, "Category not found.");
  }

  if (!fields.title) {
    return sendError(res, 400, "Title is required.");
  }

  let image = req.body.image;
  if (req.file) {
    const result = await uploadBuffer(req.file.buffer, {
      folder: "lttc/programs",
      resourceType: "image",
    });
    image = result.secure_url;
  }

  if (!image) {
    return sendError(res, 400, "A program image is required.");
  }

  const base = slugify(fields.title);
  const slug = await uniqueSlug(base, (candidate) =>
    Program.exists({ slug: candidate }),
  );

  const program = await Program.create({ ...fields, image, slug });

  return sendSuccess(res, { program }, "Program created.", 201);
});

// PUT /api/programs/:id — admin only
export const updateProgram = catchAsync(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) {
    return sendError(res, 404, "Program not found.");
  }

  const fields = buildProgramFields(req.body);

  if (fields.categoryId) {
    const category = await Category.findById(fields.categoryId);
    if (!category) {
      return sendError(res, 400, "Category not found.");
    }
  }

  if (fields.title && fields.title !== program.title) {
    const base = slugify(fields.title);
    program.slug = await uniqueSlug(base, async (candidate) => {
      const existing = await Program.findOne({ slug: candidate });
      return existing && String(existing._id) !== String(program._id);
    });
  }

  if (req.file) {
    const result = await uploadBuffer(req.file.buffer, {
      folder: "lttc/programs",
      resourceType: "image",
    });
    program.image = result.secure_url;
  } else if (req.body.image) {
    program.image = req.body.image;
  }

  Object.assign(program, fields);

  // dates is intentionally omittable — only overwrite if the caller sent it,
  // never clear it back to undefined just because a form re-submits without it.
  await program.save();

  return sendSuccess(res, { program }, "Program updated.");
});

// DELETE /api/programs/:id — admin only
export const deleteProgram = catchAsync(async (req, res) => {
  const program = await Program.findByIdAndDelete(req.params.id);
  if (!program) {
    return sendError(res, 404, "Program not found.");
  }
  return sendSuccess(res, null, "Program deleted.");
});

// PATCH /api/programs/reorder — admin only
// body: { updates: [{ id, displayOrder }, ...] }
export const reorderPrograms = catchAsync(async (req, res) => {
  const { updates } = req.body;

  if (!Array.isArray(updates) || updates.length === 0) {
    return sendError(res, 400, "Provide a non-empty array of { id, displayOrder }.");
  }

  await Promise.all(
    updates.map(({ id, displayOrder }) =>
      Program.findByIdAndUpdate(id, { displayOrder }),
    ),
  );

  return sendSuccess(res, null, "Program order updated.");
});

// GET /api/programs/materials — public, flattens every active program's
// course materials for the Downloads page.
export const listAllMaterials = catchAsync(async (req, res) => {
  const programs = await Program.find(
    { isActive: true, "materials.0": { $exists: true } },
    { title: 1, slug: 1, materials: 1 },
  ).sort({ title: 1 });

  const materials = programs.flatMap((program) =>
    program.materials.map((material) => ({
      programId: program._id,
      programTitle: program.title,
      programSlug: program.slug,
      _id: material._id,
      title: material.title,
      fileUrl: material.fileUrl,
      fileName: material.fileName,
      fileType: material.fileType,
      uploadedAt: material.uploadedAt,
    })),
  );

  return sendSuccess(res, { materials });
});

// POST /api/programs/:id/materials — admin only, multipart upload
export const addMaterial = catchAsync(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) {
    return sendError(res, 404, "Program not found.");
  }

  if (!req.file) {
    return sendError(res, 400, "A file is required.");
  }

  const title = req.body.title || req.file.originalname;

  const result = await uploadBuffer(req.file.buffer, {
    folder: "lttc/materials",
    resourceType: "auto",
  });

  program.materials.push({
    title,
    fileUrl: result.secure_url,
    filePublicId: result.public_id,
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    resourceType: result.resource_type,
  });

  await program.save();

  return sendSuccess(res, { program }, "Course material uploaded.", 201);
});

// DELETE /api/programs/:id/materials/:materialId — admin only
export const deleteMaterial = catchAsync(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (!program) {
    return sendError(res, 404, "Program not found.");
  }

  const material = program.materials.id(req.params.materialId);
  if (!material) {
    return sendError(res, 404, "Course material not found.");
  }

  await deleteAsset(material.filePublicId, material.resourceType);
  material.deleteOne();
  await program.save();

  return sendSuccess(res, { program }, "Course material deleted.");
});
