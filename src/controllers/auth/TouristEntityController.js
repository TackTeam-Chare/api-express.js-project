import TouristModel from '../../models/auth/TouristEntity.js';


const getAllTouristEntities = async (req, res) => {
    try {
        const entities = await TouristModel.getAllTouristEntities();
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
        const touristEntity = await TouristModel.getTouristEntityById(id);

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

const getNearbyTouristEntitiesHandler = async (req, res) => {
    try {
        const id = req.params.id;
        let { radius = 1500 } = req.query;
        radius = parseInt(radius, 10);
        if (isNaN(radius) || radius <= 0) {
            radius = 1500;
        }

        const entity = await TouristModel.getTouristEntityDetailsById(id);
        if (!entity) {
            return res.status(404).json({ error: 'Tourist entity not found' });
        }


        const nearbyEntities = await TouristModel.getNearbyTouristEntities(entity.latitude, entity.longitude, radius, id);

        res.json({ entity, nearbyEntities });
    } catch (error) {
        console.error('Error fetching tourist entity details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new tourist entity
const createTouristEntity = async (req, res) => {
    const touristEntity = req.body;
    try {
        const insertId = await TouristModel.create(touristEntity);
        res.json({
            message: 'Tourist entity created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Update a tourist entity
const updateTouristEntity = async (req, res) => {
    const id = req.params.id;
    const touristEntity = req.body;
    try {
        const affectedRows = await TouristModel.update(id, touristEntity);
        if (affectedRows > 0) {
            res.json({
                message: `Tourist entity with ID ${id} updated successfully`
            });
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Delete a tourist entity
const deleteTouristEntity = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await TouristModel.remove(id);
        if (affectedRows > 0) {
            res.json({
                message: `Tourist entity with ID ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export default {
    getAllTouristEntities,
    getTouristEntityById,
    getNearbyTouristEntitiesHandler,
    createTouristEntity,
    updateTouristEntity,
    deleteTouristEntity,
};