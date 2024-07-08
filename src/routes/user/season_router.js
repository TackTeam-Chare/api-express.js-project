import express from 'express';
import SeasonEntityController from '../../controllers/user/SeasonEntityController.js';

const router = express.Router();

router.get('/seasons', SeasonEntityController.getAllSeasons);
router.get('/seasons/:seasonId', SeasonEntityController.getTouristEntitiesBySeason);

export default router;