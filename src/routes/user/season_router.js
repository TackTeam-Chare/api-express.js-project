import express from 'express';
import SeasonEntityController from '../../controllers/user/SeasonEntityController.js';

const router = express.Router();

router.get('/seasons', SeasonEntityController.getAllSeasons);
router.get('/seasons/:id', SeasonEntityController.getSeasonById);
router.get('/seasons/:id/place', SeasonEntityController.getTouristEntitiesBySeason);

export default router;