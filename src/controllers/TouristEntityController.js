import TouristEntity from '../models/TouristEntity.js';

const getAllTouristEntities = async (req, res) => {
    try {
        const entities = await TouristEntity.getAllTouristEntities();
        if (entities && entities.length > 0) {
            res.json(entities);
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        console.error('Error fetching tourist entity:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getTouristEntityById = async (req, res) => {
    try {
        const id = req.params.id;
        const touristEntity = await TouristEntity.getTouristEntityById(id);

        if (touristEntity) {
            res.json(touristEntity);
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        console.error('Error fetching tourist entity:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getTouristEntitiesByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const entities = await TouristEntity.getTouristEntitiesByCategory(categoryId);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getTouristEntitiesByDistrict = async (req, res) => {
    try {
        const districtId = req.params.districtId;
        const entities = await TouristEntity.getTouristEntitiesByDistrict(districtId);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by district:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTouristEntitiesBySeason = async (req, res) => {
    try {
        const seasonId = req.params.seasonId;
        const entities = await TouristEntity.getTouristEntitiesBySeason(seasonId);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by season:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export default {
    getAllTouristEntities,
    getTouristEntityById,
    getTouristEntitiesByCategory,
    getTouristEntitiesByDistrict,
    getTouristEntitiesBySeason,
};
