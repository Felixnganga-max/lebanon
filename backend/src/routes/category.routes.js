import { Router } from "express";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authenticate from "../middleware/authenticate.js";
import optionalAuthenticate from "../middleware/optionalAuthenticate.js";

const router = Router();

// GET /api/categories — public, supports ?withPrograms=true & (if admin) ?includeInactive=true
router.get("/", optionalAuthenticate, listCategories);

router.use(authenticate);

// POST /api/categories — admin
router.post("/", createCategory);

// PUT /api/categories/:id — admin
router.put("/:id", updateCategory);

// DELETE /api/categories/:id — admin
router.delete("/:id", deleteCategory);

export default router;
