import express from 'express';
import CategoryEntityController from '../controllers/CategoryEntityController.js';

const router = express.Router();

router.get('/category/:categoryId', CategoryEntityController.getTouristEntitiesByCategory);

export default router;