import express from 'express';
import AuthController from '../controllers/AuthController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin
//for Login
router.post('/login', AuthController.login);

//for admin Registration
router.post('/register', AuthController.createAdmin);

router.post('/logout', authenticateJWT,AuthController.logout);


export default router;
