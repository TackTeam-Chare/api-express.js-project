import express from 'express';
import AuthController from '../../controllers/auth/AuthController.js';
import authenticateJWT from '../../middleware/authMiddleware.js';
const router = express.Router();

// Admin
//for Login
router.post('/login', AuthController.login);

//for admin Registration
router.post('/register', AuthController.createAdmin);

router.post('/logout', authenticateJWT,AuthController.logout);

// Protected routes
router.get('/profile',authenticateJWT, AuthController.getProfile);
router.put('/profile',authenticateJWT, AuthController.updateProfile);

export default router;
