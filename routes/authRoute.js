import express from 'express';
import { loginUser, logoutUsers } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);

router.delete('/logout', protect, logoutUsers);

export default router;
