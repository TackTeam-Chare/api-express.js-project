import express from 'express';
import SeasonEntityController from '../controllers/SeasonEntityController.js';

const router = express.Router();

router.get('/season/:seasonId', SeasonEntityController.getTouristEntitiesBySeason);

export default router;