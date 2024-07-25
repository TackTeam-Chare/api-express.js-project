import express from 'express';
import TouristEntityController from '../../controllers/user/TouristEntityController.js';

const router = express.Router();

// User
router.get('/place', TouristEntityController.getAllTouristEntities);
router.get('/place/:id', TouristEntityController.getTouristEntityById);
router.get('/place/nearby/:id', TouristEntityController.getNearbyTouristEntitiesHandler);

export default router;