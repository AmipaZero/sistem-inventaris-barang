import express from 'express';
import { registerUser, getUser } from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.get('/current', protect, getUser);


export default router;
