import express from 'express';
import DistrictEntityController from '../../controllers/user/DistrictEntityController.js';

const router = express.Router();

router.get('/districts', DistrictEntityController.getAllDistricts);
router.get('/districts/:id', DistrictEntityController.getDistrictById);
router.get('/districts/:id/place', DistrictEntityController.getTouristEntitiesByDistrict);



export default router;