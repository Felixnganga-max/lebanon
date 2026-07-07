import "dotenv/config";
import mongoose from "mongoose";
import Certificate from "../models/Certificate.js";

// The initial MEAL2026 cohort — all nine share course/duration/graduation date.
const COURSE = "Monitoring, Evaluation, Accountability, and Learning";
const DURATION = "2 Months";
const GRADUATION_DATE = "24 June 2026";

const STUDENTS = [
  { studentName: "LINUS KIPTOO", serialNumber: "MEAL2026036" },
  { studentName: "AMOLO SHILLA", serialNumber: "MEAL2026037" },
  { studentName: "TERESIA MWINZI", serialNumber: "MEAL2026038" },
  { studentName: "BIDALI JOB OKORI OSUHE", serialNumber: "MEAL2026039" },
  { studentName: "STEPHEN CHAAMBO", serialNumber: "MEAL2026040" },
  { studentName: "GATYIEL PETER NGUEN KOANG", serialNumber: "MEAL2026041" },
  { studentName: "BENARD OGANGO", serialNumber: "MEAL2026042" },
  { studentName: "BRIAN K BANDA", serialNumber: "MEAL2026043" },
  { studentName: "QABALE WARIO KANO", serialNumber: "MEAL2026044" },
];

/**
 * Seeds the initial MEAL2026 certificate cohort. Safe to re-run — skips
 * any serial number that already exists instead of erroring out.
 *
 * Usage: node src/scripts/seedCertificates.js
 */
async function run() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("[seedCertificates] MONGODB_URI is not set. Aborting.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  let created = 0;
  let skipped = 0;

  for (const student of STUDENTS) {
    const exists = await Certificate.findOne({
      serialNumber: student.serialNumber,
    });

    if (exists) {
      skipped += 1;
      continue;
    }

    await Certificate.create({
      ...student,
      course: COURSE,
      duration: DURATION,
      graduationDate: GRADUATION_DATE,
      hasQRCode: false,
    });
    created += 1;
  }

  console.log(
    `[seedCertificates] Done — ${created} created, ${skipped} already existed.`,
  );

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("[seedCertificates] Failed:", err.message);
  process.exit(1);
});
