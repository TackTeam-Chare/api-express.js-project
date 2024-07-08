import SeasonModel from '../../models/user/Season.js';

const getAllSeasons = async (req, res) => {
    try {
        const seasons = await SeasonModel.getAllSeasons();
        res.json(seasons);
    } catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

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
    getAllSeasons,
    getTouristEntitiesBySeason,
};