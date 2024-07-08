import SeasonsRelationModel from '../../models/auth/SeasonsRelation.js';

// Get all seasons_relation
const getAllSeasonsRelations = async (req, res) => {
    try {
        const relations = await SeasonsRelationModel.getAllSeasonsRelations();
        res.json(relations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get seasons_relation by ID
const getSeasonsRelationById = async (req, res) => {
    try {
        const id = req.params.id;
        const relation = await SeasonsRelationModel.getSeasonsRelationById(id);
        if (relation) {
            res.json(relation);
        } else {
            res.status(404).json({ error: 'Relation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new seasons_relation
const createSeasonsRelation = async (req, res) => {
    const relation = req.body;
    try {
        const insertId = await SeasonsRelationModel.create(relation);
        res.json({
            message: 'Relation created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a seasons_relation
const updateSeasonsRelation = async (req, res) => {
    const id = req.params.id;
    const relation = req.body;
    try {
        const affectedRows = await SeasonsRelationModel.update(id, relation);
        if (affectedRows > 0) {
            res.json({ message: `Relation with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Relation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a seasons_relation
const deleteSeasonsRelation = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await SeasonsRelationModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Relation with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Relation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllSeasonsRelations,
    getSeasonsRelationById,
    createSeasonsRelation,
    updateSeasonsRelation,
    deleteSeasonsRelation,
};
