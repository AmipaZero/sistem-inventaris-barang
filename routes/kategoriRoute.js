import express from 'express';
import { addKategori, deleteKategori, getAllKategori, getKategoriById, getReportKategori, updateKategori,  } from '../controllers/kategoriController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllKategori);
router.get('/report', protect, isAdmin, getReportKategori);
router.get('/:id', protect,getKategoriById);

router.post('/', protect,addKategori);

router.put('/:id', protect,updateKategori);

router.delete('/:id', protect,deleteKategori)

export default router;
