import express from 'express';
import CategoryEntityController from '../../controllers/user/CategoryEntityController.js';

const router = express.Router();

router.get('/categories', CategoryEntityController.getAllCategories);
router.get('/categories/:id', CategoryEntityController.getCategoryById);
router.get('categories/:id/place', CategoryEntityController.getTouristEntitiesByCategory);

export default router;