import express from 'express';
import SeasonEntityController from '../controllers/SeasonEntityController.js';

const router = express.Router();

router.get('/seasons', SeasonEntityController.getAllSeasons);
router.get('/seasons/:seasonId', SeasonEntityController.getTouristEntitiesBySeason);

export default router;