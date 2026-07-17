import Category from "../models/Category.js";
import Program from "../models/Program.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import slugify, { uniqueSlug } from "../utils/slugify.js";

function toProgramDataShape(program) {
  const shaped = {
    title: program.title,
    slug: program.slug,
    image: program.image,
    duration: program.duration,
    mode: program.mode,
    fee: program.fee,
    suitable: program.suitable,
    description: program.description,
    overview: program.overview,
    learningOutcomes: program.learningOutcomes,
    curriculum: program.curriculum,
    careerPaths: program.careerPaths,
    certification: program.certification,
    materials: program.materials || [],
  };
  // Omit entirely when not set, matching how only a few source programs
  // carry a scheduled intake date — never default to an empty string.
  if (program.dates) shaped.dates = program.dates;
  return shaped;
}

// GET /api/categories — public (supports ?includeInactive=true for logged-in admins)
export const listCategories = catchAsync(async (req, res) => {
  const filter =
    req.user && req.query.includeInactive === "true" ? {} : { isActive: true };
  const categories = await Category.find(filter).sort({ displayOrder: 1 });

  const programCounts = await Program.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: "$categoryId", count: { $sum: 1 } } },
  ]);
  const countByCategory = new Map(
    programCounts.map((c) => [String(c._id), c.count]),
  );

  if (req.query.withPrograms === "true") {
    const shaped = await Promise.all(
      categories.map(async (cat) => {
        const programs = await Program.find({
          categoryId: cat._id,
          isActive: true,
        }).sort({ displayOrder: 1 });

        return {
          id: cat.slug,
          name: cat.name,
          programs: programs.map(toProgramDataShape),
        };
      }),
    );
    return sendSuccess(res, { categories: shaped });
  }

  const withCounts = categories.map((cat) => ({
    ...cat.toObject(),
    programCount: countByCategory.get(String(cat._id)) || 0,
  }));

  return sendSuccess(res, { categories: withCounts });
});

// POST /api/categories — admin only
export const createCategory = catchAsync(async (req, res) => {
  const { name, displayOrder, isActive } = req.body;

  if (!name) {
    return sendError(res, 400, "Category name is required.");
  }

  const base = slugify(name);
  const slug = await uniqueSlug(base, (candidate) =>
    Category.exists({ slug: candidate }),
  );

  let order = displayOrder;
  if (order === undefined) {
    const last = await Category.findOne().sort({ displayOrder: -1 });
    order = last ? last.displayOrder + 1 : 0;
  }

  const category = await Category.create({
    name,
    slug,
    displayOrder: order,
    isActive: isActive ?? true,
  });

  return sendSuccess(res, { category }, "Category created.", 201);
});

// PUT /api/categories/:id — admin only
export const updateCategory = catchAsync(async (req, res) => {
  const { name, displayOrder, isActive } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) {
    return sendError(res, 404, "Category not found.");
  }

  if (name && name !== category.name) {
    const base = slugify(name);
    category.slug = await uniqueSlug(base, async (candidate) => {
      const existing = await Category.findOne({ slug: candidate });
      return existing && String(existing._id) !== String(category._id);
    });
    category.name = name;
  }

  if (displayOrder !== undefined) category.displayOrder = displayOrder;
  if (isActive !== undefined) category.isActive = isActive;

  await category.save();

  return sendSuccess(res, { category }, "Category updated.");
});

// DELETE /api/categories/:id — admin only
export const deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return sendError(res, 404, "Category not found.");
  }

  const programCount = await Program.countDocuments({
    categoryId: category._id,
  });

  if (programCount > 0) {
    const { reassignTo } = req.body || {};

    if (!reassignTo) {
      return sendError(
        res,
        409,
        `${programCount} program(s) still belong to this category. Reassign them to another category (pass "reassignTo") or delete them first.`,
      );
    }

    const target = await Category.findById(reassignTo);
    if (!target || String(target._id) === String(category._id)) {
      return sendError(res, 400, "Invalid reassignment target category.");
    }

    await Program.updateMany(
      { categoryId: category._id },
      { categoryId: target._id },
    );
  }

  await category.deleteOne();

  return sendSuccess(res, null, "Category deleted.");
});
