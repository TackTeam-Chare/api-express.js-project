import express from 'express';
import OperatingHoursEntityController from '../../controllers/user/OperatingHoursEntityController.js';

const router = express.Router();

router.get('/operating-hours', OperatingHoursEntityController.getAllOperatingHours);
router.get('/operating-hours/:id', OperatingHoursEntityController.getOperatingHoursById);
router.get('/tourist-entities/operating-hours/:day_of_week/:opening_time/:closing_time', OperatingHoursEntityController.getTouristEntitiesByTime);

export default router;