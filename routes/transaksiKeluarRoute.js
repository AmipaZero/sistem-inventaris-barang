import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { createTransaksiKeluar, deleteTransaksiKeluar, getAllTransaksiKeluar, getTransaksiKeluarById, reportTransaksiKeluar } from "../controllers/transaksiKeluarController.js";


const router = express.Router();

router.post("/", protect, createTransaksiKeluar);
router.get("/report", protect,isAdmin, reportTransaksiKeluar);
router.get("/", protect, getAllTransaksiKeluar);
router.get("/:id", protect, getTransaksiKeluarById);
router.delete("/:id", protect, deleteTransaksiKeluar);

export default router;
