import express from "express";
import { createBarang, getAllBarang, getBarangById, updateBarang, deleteBarang, getReportBarang } from "../controllers/barangController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBarang);
router.get("/report", protect, isAdmin, getReportBarang);
router.get("/", protect, getAllBarang);
router.get("/:id", protect, getBarangById);
router.put("/:id", protect, updateBarang);
router.delete("/:id", protect, deleteBarang);

export default router;
