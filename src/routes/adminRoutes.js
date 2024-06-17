import express from 'express';
import AdminController from '../controllers/AdminController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateJWT); //apply middleware to all routes

router.get('/tourist-entities', AdminController.getAllTouristEntities);
router.get('/tourist-entities/:id', AdminController.getTouristEntityById);
router.post('/tourist-entities', AdminController.createTouristEntity);
router.put('/tourist-entities/:id', AdminController.updateTouristEntity);
router.delete('/tourist-entities/:id', AdminController.deleteTouristEntity);

export default router;
