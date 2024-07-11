import express from 'express';
import DistrictEntityController from '../../controllers/user/DistrictEntityController.js';

const router = express.Router();

router.get('/districts', DistrictEntityController.getAllDistricts);
router.get('/districts/:id', DistrictEntityController.getDistrictById);
router.get('/tourist-entities/districts/:id', DistrictEntityController.getTouristEntitiesByDistrict);



export default router;