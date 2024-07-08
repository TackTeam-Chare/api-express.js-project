import express from 'express';
import AdminController from '../../controllers/AdminController.js';
import AuthController from '../../controllers/AuthController.js';
const router = express.Router();



router.get('/tourist-entities', AdminController.getAllTouristEntities);
router.get('/tourist-entities/:id', AdminController.getTouristEntityById);
router.get('/tourist-entities/:id/nearby', AdminController.getNearbyTouristEntitiesHandler);
router.post('/tourist-entities', AdminController.createTouristEntity);
router.put('/tourist-entities/:id', AdminController.updateTouristEntity);
router.delete('/tourist-entities/:id', AdminController.deleteTouristEntity);

// Protected routes
router.get('/profile', AuthController.getProfile);
router.put('/profile', AuthController.updateProfile);

export default router;
