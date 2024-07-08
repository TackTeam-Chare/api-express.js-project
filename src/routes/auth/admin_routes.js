import express from 'express';
import TouristEntityController from '../../controllers/auth/TouristEntityController.js';
import SeasonEntityController from '../../controllers/auth/SeasonEntityController.js';
import CategoryEntityController from '../../controllers/auth/CategoryEntityController.js';
import OperatingHoursEntityController from '../../controllers/auth/OperatingHoursEntityController.js';
import DistrictEntityController from '../../controllers/auth/DistrictEntityController.js';

const router = express.Router();


router.get('/tourist-entities', TouristEntityController.getAllTouristEntities); // ดึงข้อมูลตารางสถานที่ทั้งหมด
router.get('/tourist-entities/:id', TouristEntityController.getTouristEntityById); // ดึงข้อมูลตารางสถานที่ด้วยไอดี
router.get('/tourist-entities/:id/nearby', TouristEntityController.getNearbyTouristEntitiesHandler); // ดึงข้อมูลตารางสถานที่ด้วยไอดีเเละสถานที่ใกล้เคียง
router.post('/tourist-entities', TouristEntityController.createTouristEntity); 
router.put('/tourist-entities/:id', TouristEntityController.updateTouristEntity);
router.delete('/tourist-entities/:id', TouristEntityController.deleteTouristEntity);

router.get('/operating-hours', OperatingHoursEntityController.getAllOperatingHours);
router.get('/operating-hours/:id', OperatingHoursEntityController.getOperatingHoursById);
router.get('/operating-hours/:day_of_week/:opening_time/:closing_time', OperatingHoursEntityController.getTouristEntitiesByTime);


router.get('/seasons', SeasonEntityController.getAllSeasons);
router.get('/seasons/:seasonId', SeasonEntityController.getTouristEntitiesBySeason);

router.get('/districts', DistrictEntityController.getAllDistricts);
router.get('/districts/:districtId', DistrictEntityController.getTouristEntitiesByDistrict);


router.get('/categories', CategoryEntityController.getAllCategories);
router.get('/categories/:categoryId', CategoryEntityController.getTouristEntitiesByCategory);



export default router;
