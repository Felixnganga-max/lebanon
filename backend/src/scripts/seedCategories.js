import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category.js";

// Mirrors the 7 categories currently hardcoded in
// frontend/src/data/programData.js, in the same order, so their ids
// (now slugs) match exactly and the admin dashboard isn't empty on first load.
const CATEGORIES = [
  { name: "Digital & Tech", slug: "digital" },
  { name: "Data & Analytics", slug: "data" },
  { name: "Leadership & Mgmt", slug: "leadership" },
  { name: "Compliance & Safety", slug: "compliance" },
  { name: "NGO & Development", slug: "ngo" },
  { name: "Business", slug: "business" },
  { name: "Specialized", slug: "specialized" },
];

/**
 * Seeds the 7 existing categories. Safe to re-run — skips any slug that
 * already exists instead of erroring out.
 *
 * Usage: node src/scripts/seedCategories.js
 */
async function run() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("[seedCategories] MONGODB_URI is not set. Aborting.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < CATEGORIES.length; i += 1) {
    const { name, slug } = CATEGORIES[i];
    const exists = await Category.findOne({ slug });

    if (exists) {
      skipped += 1;
      continue;
    }

    await Category.create({ name, slug, displayOrder: i });
    created += 1;
  }

  console.log(
    `[seedCategories] Done — ${created} created, ${skipped} already existed.`,
  );

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seedCategories] Failed:", err.message);
  process.exit(1);
});
