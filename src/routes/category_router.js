import express from 'express';
import CategoryEntityController from '../controllers/CategoryEntityController.js';

const router = express.Router();

router.get('/categories', CategoryEntityController.getAllCategories);
router.get('/categories/:categoryId', CategoryEntityController.getTouristEntitiesByCategory);

export default router;