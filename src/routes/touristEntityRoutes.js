import express from 'express';
import TouristEntityController from '../controllers/TouristEntityController.js';

const router = express.Router();

// User
router.get('/tourist-entities', TouristEntityController.getAllTouristEntities);
router.get('/tourist-entities/:id', TouristEntityController.getTouristEntityById);
router.get('/tourist-entities/category/:categoryId', TouristEntityController.getTouristEntitiesByCategory);
router.get('/tourist-entities/district/:districtId', TouristEntityController.getTouristEntitiesByDistrict);
router.get('/tourist-entities/season/:seasonId', TouristEntityController.getTouristEntitiesBySeason);
router.get('/tourist-entities/open-now', TouristEntityController.getTouristEntitiesOpenNow);
router.get('/tourist-entities/details', TouristEntityController.getAllTouristEntitiesWithDetails);


export default router;
