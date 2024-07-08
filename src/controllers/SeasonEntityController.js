import SeasonModel from '../models/Season.js';


const getTouristEntitiesBySeason = async (req, res) => {
    try {
        const seasonId = req.params.seasonId;
        const entities = await SeasonModel.getTouristEntitiesBySeason(seasonId);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by season:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export default {
    getTouristEntitiesBySeason,
};