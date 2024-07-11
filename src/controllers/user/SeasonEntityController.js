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


// Get season by ID
const getSeasonById = async (req, res) => {
    try {
        const id = req.params.id;
        const season = await SeasonModel.getSeasonById(id);
        if (season) {
            res.json(season);
        } else {
            res.status(404).json({ error: 'Season not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getTouristEntitiesBySeason = async (req, res) => {
    try {
        const id = req.params.id;
        const entities = await SeasonModel.getTouristEntitiesBySeason(id);
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
    getSeasonById,
    getTouristEntitiesBySeason,
};