import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Category from "../models/Category.js";
import Program from "../models/Program.js";
import { slugify, uniqueSlug } from "../utils/slugify.js";
import { uploadBuffer } from "../utils/cloudinary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_SRC = path.resolve(__dirname, "../../../frontend/src");
const ASSETS_DIR = path.join(FRONTEND_SRC, "assets");
const PROGRAM_DATA_PATH = path.join(FRONTEND_SRC, "data", "programData.js");
const ASSETS_JS_PATH = path.join(ASSETS_DIR, "assets.js");

// Matches the 7 category slugs seedCategories.js already created —
// programData.js's category `id` values line up with them 1:1.
const CATEGORY_SLUGS = new Set([
  "digital",
  "data",
  "leadership",
  "compliance",
  "ngo",
  "business",
  "specialized",
]);

// frontend/src/assets/assets.js is just `import name from "./file.webp"`
// lines re-exported as an object — parse those pairs directly so this
// script never has to duplicate the { key: filename } mapping by hand.
function loadAssetFilenameMap() {
  const src = fs.readFileSync(ASSETS_JS_PATH, "utf8");
  const map = {};
  const importRe = /^import\s+(\w+)\s+from\s+["']\.\/(.+?)["'];?$/gm;
  let match;
  while ((match = importRe.exec(src))) {
    map[match[1]] = match[2];
  }
  return map;
}

// programData.js is a real ES module but `import { assets } from
// "../assets/assets"` pulls in Vite-only `.webp` asset imports that plain
// Node can't resolve. Rather than transcribing all 44 programs by hand
// (error-prone) or requiring Vite at migration time, rewrite the source
// text so `assets.smm` becomes the plain string "smm" — turning it into a
// dependency-free module Node can import directly — then resolve "smm"
// back to a real file via loadAssetFilenameMap() below.
async function loadCategoriesData() {
  const src = fs.readFileSync(PROGRAM_DATA_PATH, "utf8");
  const transformed = src
    .replace(/^import\s*\{\s*assets\s*\}\s*from\s*["'].*?["'];?\s*$/m, "")
    .replace(/assets\.(\w+)/g, '"$1"');

  const tmpPath = path.join(__dirname, "._programData.generated.mjs");
  fs.writeFileSync(tmpPath, transformed);
  try {
    const mod = await import(`file://${tmpPath}?t=${Date.now()}`);
    return mod.categories;
  } finally {
    fs.unlinkSync(tmpPath);
  }
}

// `imageRef` is either an already-remote URL (Unsplash) or a plain asset
// key like "smm" (formerly `assets.smm`) — in the latter case, read the
// real file off disk and upload it to Cloudinary so the DB only ever
// stores real URLs, never a reference to the frontend bundle.
async function resolveImageUrl(imageRef, assetMap) {
  if (typeof imageRef === "string" && /^https?:\/\//.test(imageRef)) {
    return imageRef;
  }

  const filename = assetMap[imageRef];
  if (!filename) {
    throw new Error(`Unknown asset reference "${imageRef}" — not found in assets.js`);
  }

  const buffer = fs.readFileSync(path.join(ASSETS_DIR, filename));
  const result = await uploadBuffer(buffer, {
    folder: "lttc/programs",
    resourceType: "image",
  });
  return result.secure_url;
}

/**
 * Migrates the 44 hardcoded programs in frontend/src/data/programData.js
 * into MongoDB, uploading their local images to Cloudinary along the way.
 * Safe to re-run — skips any program that already exists (matched by
 * title + category).
 *
 * Prerequisite: run seedCategories.js first so the 7 categories exist.
 * Usage: node src/scripts/seedPrograms.js
 */
async function run() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("[seedPrograms] MONGODB_URI is not set. Aborting.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const assetMap = loadAssetFilenameMap();
  const categoriesData = await loadCategoriesData();

  let created = 0;
  let skipped = 0;

  for (const cat of categoriesData) {
    if (!CATEGORY_SLUGS.has(cat.id)) {
      console.warn(`[seedPrograms] Unrecognized category id "${cat.id}" — skipping.`);
      continue;
    }

    const category = await Category.findOne({ slug: cat.id });
    if (!category) {
      console.warn(
        `[seedPrograms] No category with slug "${cat.id}" — run seedCategories.js first. Skipping ${cat.programs.length} program(s).`,
      );
      continue;
    }

    for (let i = 0; i < cat.programs.length; i += 1) {
      const p = cat.programs[i];

      const existing = await Program.findOne({ title: p.title, categoryId: category._id });
      if (existing) {
        skipped += 1;
        continue;
      }

      const image = await resolveImageUrl(p.image, assetMap);
      const slug = await uniqueSlug(slugify(p.title), (candidate) =>
        Program.exists({ slug: candidate }),
      );

      await Program.create({
        categoryId: category._id,
        title: p.title,
        slug,
        image,
        duration: p.duration,
        mode: p.mode,
        fee: p.fee,
        suitable: p.suitable,
        description: p.description,
        overview: p.overview,
        learningOutcomes: p.learningOutcomes || [],
        curriculum: p.curriculum || [],
        careerPaths: p.careerPaths || [],
        certification: p.certification,
        dates: p.dates,
        displayOrder: i,
      });

      created += 1;
      console.log(`[seedPrograms] Created "${p.title}" (${cat.id})`);
    }
  }

  console.log(`[seedPrograms] Done — ${created} created, ${skipped} already existed.`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seedPrograms] Failed:", err.message);
  console.error(err.stack);
  process.exit(1);
});
