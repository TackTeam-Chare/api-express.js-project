import express from 'express';
import TouristEntityController from '../../controllers/user/TouristEntityController.js';
import OperatingHoursEntityController from '../../controllers/user/OperatingHoursEntityController.js';
import SeasonEntityController from '../../controllers/user/SeasonEntityController.js';
import DistrictEntityController from '../../controllers/user/DistrictEntityController.js';
import CategoryEntityController from '../../controllers/user/CategoryEntityController.js';
const router = express.Router();

// User
router.get('/place', TouristEntityController.getAllTouristEntities);
router.get('/place/:id', TouristEntityController.getTouristEntityById);
router.get('/place/nearby/:id', TouristEntityController.getNearbyTouristEntitiesHandler);

router.get('/operating-hours', OperatingHoursEntityController.getAllOperatingHours);
router.get('/operating-hours/:id', OperatingHoursEntityController.getOperatingHoursById);
router.get('/operating-hours/:day_of_week/:opening_time/:closing_time', OperatingHoursEntityController.getTouristEntitiesByTime);

router.get('/seasons', SeasonEntityController.getAllSeasons);
router.get('/seasons/:id', SeasonEntityController.getSeasonById);
router.get('/seasons/:id/place', SeasonEntityController.getTouristEntitiesBySeason);

router.get('/districts', DistrictEntityController.getAllDistricts);
router.get('/districts/:id', DistrictEntityController.getDistrictById);
router.get('/districts/:id/place', DistrictEntityController.getTouristEntitiesByDistrict);

router.get('/categories', CategoryEntityController.getAllCategories);
router.get('/categories/:id', CategoryEntityController.getCategoryById);
router.get('/categories/:id/place', CategoryEntityController.getTouristEntitiesByCategory);

export default router;