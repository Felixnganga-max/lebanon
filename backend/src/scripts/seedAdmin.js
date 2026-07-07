import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

/**
 * Creates the first super-admin from ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD.
 * Safe to re-run — it skips creation if that email already exists.
 *
 * Usage: node src/scripts/seedAdmin.js
 */
async function run() {
  const { MONGODB_URI, ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD } = process.env;

  if (!MONGODB_URI) {
    console.error("[seedAdmin] MONGODB_URI is not set. Aborting.");
    process.exit(1);
  }

  if (!ADMIN_SEED_EMAIL || !ADMIN_SEED_PASSWORD) {
    console.error(
      "[seedAdmin] ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must both be set. Aborting.",
    );
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const existing = await Admin.findOne({
    email: ADMIN_SEED_EMAIL.toLowerCase(),
  });

  if (existing) {
    console.log(`[seedAdmin] Admin ${ADMIN_SEED_EMAIL} already exists — skipping.`);
  } else {
    await Admin.create({
      name: "Super Admin",
      email: ADMIN_SEED_EMAIL,
      password: ADMIN_SEED_PASSWORD,
      role: "super_admin",
    });
    console.log(`[seedAdmin] Created super-admin: ${ADMIN_SEED_EMAIL}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seedAdmin] Failed:", err.message);
  process.exit(1);
});
