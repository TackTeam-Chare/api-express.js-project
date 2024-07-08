import express from 'express';
import OperatingHoursEntityController from '../controllers/OperatingHoursEntityController.js';

const router = express.Router();

router.get('/operating-hours/:id', OperatingHoursEntityController.getOperatingHoursById);

router.get('/operating-hours/:day_of_week/:opening_time/:closing_time', OperatingHoursEntityController.getTouristEntitiesByTime);


export default router;