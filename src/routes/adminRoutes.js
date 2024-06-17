import express from 'express';
import AdminController from '../controllers/AdminController.js';
import authenticateJWT from '../middleware/authMiddleware.js';
import AuthController from '../controllers/AuthController.js';
const router = express.Router();

router.use(authenticateJWT); //apply middleware to all routes for Admin

router.get('/tourist-entities', AdminController.getAllTouristEntities);
router.get('/tourist-entities/:id', AdminController.getTouristEntityById);
router.post('/tourist-entities', AdminController.createTouristEntity);
router.put('/tourist-entities/:id', AdminController.updateTouristEntity);
router.delete('/tourist-entities/:id', AdminController.deleteTouristEntity);

// Protected routes
router.get('/profile', authenticateJWT, AuthController.getProfile);
router.put('/profile', authenticateJWT, AuthController.updateProfile);

export default router;
