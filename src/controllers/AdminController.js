import Admin from '../models/Admin.js';

// Get all tourist entities
const getAllTouristEntities = async (req, res) => {
    try {
        const entities = await Admin.getAll();
        res.json(entities);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get a tourist entity by ID
const getTouristEntityById = async (req, res) => {
    const id = req.params.id;
    try {
        const entity = await Admin.getById(id);
        if (entity) {
            res.json(entity);
        } else {
            res.status(404).json({ error: 'Tourist entity not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new tourist entity
const createTouristEntity = async (req, res) => {
    const touristEntity = req.body;
    try {
        const insertId = await Admin.create(touristEntity);
        res.json({ message: 'Tourist entity created successfully', id: insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a tourist entity
const updateTouristEntity = async (req, res) => {
    const id = req.params.id;
    const touristEntity = req.body;
    try {
        const affectedRows = await Admin.update(id, touristEntity);
        if (affectedRows > 0) {
            res.json({ message: `Tourist entity with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Tourist entity not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a tourist entity
const deleteTouristEntity = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await Admin.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Tourist entity with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Tourist entity not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export  default{
    getAllTouristEntities,
    getTouristEntityById,
    createTouristEntity,
    updateTouristEntity,
    deleteTouristEntity,


};
