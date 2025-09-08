import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { createTransaksiMasuk, deleteTransaksiMasuk, getAllTransaksiMasuk, getTransaksiMasukById, reportTransaksiMasuk } from "../controllers/transaksiMasukController.js";

const router = express.Router();

router.post("/", protect, createTransaksiMasuk);
router.get("/report", protect,isAdmin, reportTransaksiMasuk);
router.get("/", protect, getAllTransaksiMasuk);
router.get("/:id", protect, getTransaksiMasukById);
router.delete("/:id", protect, deleteTransaksiMasuk);

export default router;
