import SeasonModel from '../../models/auth/Season.js';

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

// Create a new season
const createSeason = async (req, res) => {
    const season = req.body;
    try {
        const insertId = await SeasonModel.create(season);
        res.json({
            message: 'Season created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a season
const updateSeason = async (req, res) => {
    const id = req.params.id;
    const season = req.body;
    try {
        const affectedRows = await SeasonModel.update(id, season);
        if (affectedRows > 0) {
            res.json({ message: `Season with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Season not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a season
const deleteSeason = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await SeasonModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Season with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Season not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    getSeasonById,
    createSeason,
    updateSeason,
    deleteSeason,
    getTouristEntitiesBySeason,
};