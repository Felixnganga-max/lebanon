import { Router } from "express";
import {
  listPrograms,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deleteProgram,
  reorderPrograms,
  listAllMaterials,
  addMaterial,
  deleteMaterial,
} from "../controllers/program.controller.js";
import authenticate from "../middleware/authenticate.js";
import optionalAuthenticate from "../middleware/optionalAuthenticate.js";
import upload from "../middleware/upload.js";

const router = Router();

// GET /api/programs — public, ?categoryId= or ?categorySlug= & (if admin) ?includeInactive=true
router.get("/", optionalAuthenticate, listPrograms);

// GET /api/programs/materials — public, flattened course materials for Downloads
router.get("/materials", listAllMaterials);

// GET /api/programs/:slug — public
router.get("/:slug", getProgramBySlug);

router.use(authenticate);

// PATCH /api/programs/reorder — admin, bulk displayOrder update
router.patch("/reorder", reorderPrograms);

// POST /api/programs — admin, multipart if image included else JSON
router.post("/", upload.single("image"), createProgram);

// PUT /api/programs/:id — admin
router.put("/:id", upload.single("image"), updateProgram);

// DELETE /api/programs/:id — admin
router.delete("/:id", deleteProgram);

// POST /api/programs/:id/materials — admin, multipart upload
router.post("/:id/materials", upload.single("file"), addMaterial);

// DELETE /api/programs/:id/materials/:materialId — admin
router.delete("/:id/materials/:materialId", deleteMaterial);

export default router;
