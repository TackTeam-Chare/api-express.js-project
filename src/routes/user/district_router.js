import express from 'express';
import DistrictEntityController from '../../controllers/user/DistrictEntityController.js';

const router = express.Router();

router.get('/districts', DistrictEntityController.getAllDistricts);
router.get('/districts/:districtId', DistrictEntityController.getTouristEntitiesByDistrict);

export default router;