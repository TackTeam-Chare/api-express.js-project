import express from 'express';
import TouristEntityController from '../../controllers/user/TouristEntityController.js';

const router = express.Router();

// User
router.get('/tourist-entities', TouristEntityController.getAllTouristEntities);
router.get('/tourist-entities/:id', TouristEntityController.getTouristEntityById);
router.get('/tourist-entities/:id/nearby', TouristEntityController.getNearbyTouristEntitiesHandler);






export default router;