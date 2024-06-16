// routes/adminRoutes.js
import express from 'express';
import AdminController from '../controllers/AdminController.js';

const router = express.Router();

// Routes for tourist entity management by admin
router.get('/tourist-entities', AdminController.getAllTouristEntities);
router.get('/tourist-entities/:id', AdminController.getTouristEntityById);
router.post('/tourist-entities', AdminController.createTouristEntity);
router.put('/tourist-entities/:id', AdminController.updateTouristEntity);
router.delete('/tourist-entities/:id', AdminController.deleteTouristEntity);

export default router;
