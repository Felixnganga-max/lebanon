import { Router } from "express";
import {
  verifyCertificate,
  listCertificates,
  createCertificate,
  bulkCreateCertificates,
  updateCertificate,
  deleteCertificate,
  getCertificateQr,
} from "../controllers/certificate.controller.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

// GET /api/certificates/verify/:serialNumber — public, must come before /:id-style routes
router.get("/verify/:serialNumber", verifyCertificate);

router.use(authenticate);

// GET /api/certificates — admin, paginated list
router.get("/", listCertificates);

// POST /api/certificates — admin, create single
router.post("/", createCertificate);

// POST /api/certificates/bulk — admin, bulk create
router.post("/bulk", bulkCreateCertificates);

// PUT /api/certificates/:id — admin, update
router.put("/:id", updateCertificate);

// DELETE /api/certificates/:id — admin, delete
router.delete("/:id", deleteCertificate);

// GET /api/certificates/:id/qr — admin, generate/return cached QR image
router.get("/:id/qr", getCertificateQr);

export default router;
