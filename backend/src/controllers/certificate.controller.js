import QRCode from "qrcode";
import Certificate from "../models/Certificate.js";
import catchAsync from "../utils/catchAsync.js";
import sendSuccess from "../utils/sendSuccess.js";
import sendError from "../utils/sendError.js";
import { uploadBuffer } from "../utils/cloudinary.js";
import {
  CERTIFICATE_CONFIRMATION_STATEMENT,
  CERTIFICATE_INVALID_MESSAGE,
} from "../utils/copy.js";

// GET /api/certificates/verify/:serialNumber — public
export const verifyCertificate = catchAsync(async (req, res) => {
  const serialNumber = req.params.serialNumber.trim().toUpperCase();

  const certificate = await Certificate.findOne({ serialNumber });

  if (!certificate) {
    return sendError(res, 404, CERTIFICATE_INVALID_MESSAGE);
  }

  return sendSuccess(res, {
    certificate: {
      serialNumber: certificate.serialNumber,
      studentName: certificate.studentName,
      course: certificate.course,
      duration: certificate.duration,
      graduationDate: certificate.graduationDate,
      hasQRCode: certificate.hasQRCode,
    },
    confirmationStatement: CERTIFICATE_CONFIRMATION_STATEMENT,
  });
});

// GET /api/certificates — admin only, paginated
export const listCertificates = catchAsync(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
  const search = (req.query.search || "").trim();

  const filter = search
    ? {
        $or: [
          { serialNumber: new RegExp(search, "i") },
          { studentName: new RegExp(search, "i") },
        ],
      }
    : {};

  const [certificates, total] = await Promise.all([
    Certificate.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Certificate.countDocuments(filter),
  ]);

  return sendSuccess(res, {
    certificates,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// POST /api/certificates — admin only
export const createCertificate = catchAsync(async (req, res) => {
  const { serialNumber, studentName, course, duration, graduationDate, hasQRCode } =
    req.body;

  if (!serialNumber || !studentName || !course || !duration || !graduationDate) {
    return sendError(res, 400, "All certificate fields are required.");
  }

  const certificate = await Certificate.create({
    serialNumber,
    studentName,
    course,
    duration,
    graduationDate,
    hasQRCode: hasQRCode ?? false,
    issuedBy: req.user.userId,
  });

  return sendSuccess(res, { certificate }, "Certificate created.", 201);
});

// POST /api/certificates/bulk — admin only
export const bulkCreateCertificates = catchAsync(async (req, res) => {
  const { certificates } = req.body;

  if (!Array.isArray(certificates) || certificates.length === 0) {
    return sendError(res, 400, "Provide a non-empty array of certificates.");
  }

  const docs = certificates.map((c) => ({
    serialNumber: c.serialNumber,
    studentName: c.studentName,
    course: c.course,
    duration: c.duration,
    graduationDate: c.graduationDate,
    hasQRCode: c.hasQRCode ?? false,
    issuedBy: req.user.userId,
  }));

  try {
    const created = await Certificate.insertMany(docs, { ordered: false });
    return sendSuccess(
      res,
      { count: created.length, certificates: created },
      `${created.length} certificate(s) created.`,
      201,
    );
  } catch (err) {
    // insertMany with ordered:false throws once any doc fails (e.g. a
    // duplicate serial number) even though the rest succeeded — report both.
    if (err.writeErrors) {
      const insertedCount = err.result?.insertedCount ?? err.insertedDocs?.length ?? 0;
      const failed = err.writeErrors.map((e) => ({
        serialNumber: docs[e.index]?.serialNumber,
        reason: e.errmsg || e.err?.errmsg || "Duplicate or invalid record.",
      }));
      return sendSuccess(
        res,
        { count: insertedCount, failed },
        `${insertedCount} certificate(s) created, ${failed.length} failed (likely duplicate serial numbers).`,
        207,
      );
    }
    throw err;
  }
});

// PUT /api/certificates/:id — admin only
export const updateCertificate = catchAsync(async (req, res) => {
  const { serialNumber, studentName, course, duration, graduationDate, hasQRCode } =
    req.body;

  const certificate = await Certificate.findByIdAndUpdate(
    req.params.id,
    { serialNumber, studentName, course, duration, graduationDate, hasQRCode },
    { new: true, runValidators: true, omitUndefined: true },
  );

  if (!certificate) {
    return sendError(res, 404, "Certificate not found.");
  }

  return sendSuccess(res, { certificate }, "Certificate updated.");
});

// GET /api/certificates/:id/qr — admin only
export const getCertificateQr = catchAsync(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);

  if (!certificate) {
    return sendError(res, 404, "Certificate not found.");
  }

  if (!certificate.qrCodeUrl) {
    const verifyUrl = `https://lebanonttc.co.ke/verify-certificate?sn=${certificate.serialNumber}`;
    const buffer = await QRCode.toBuffer(verifyUrl, { type: "png", width: 400 });
    const result = await uploadBuffer(buffer, {
      folder: "lttc/qrcodes",
      resourceType: "image",
    });
    certificate.qrCodeUrl = result.secure_url;
    certificate.hasQRCode = true;
    await certificate.save();
  }

  return res.redirect(certificate.qrCodeUrl);
});

// GET /api/certificates/qr/general — admin only, static QR to the
// verify-certificate landing page (no serial number encoded — visitors
// type their own serial in once they land there).
export const getGeneralCertificateQr = catchAsync(async (req, res) => {
  const verifyUrl = "https://lebanonttc.co.ke/verify-certificate";
  const buffer = await QRCode.toBuffer(verifyUrl, { type: "png", width: 400 });
  res.set("Content-Type", "image/png");
  return res.send(buffer);
});

// DELETE /api/certificates/:id — admin only
export const deleteCertificate = catchAsync(async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);

  if (!certificate) {
    return sendError(res, 404, "Certificate not found.");
  }

  return sendSuccess(res, null, "Certificate deleted.");
});
