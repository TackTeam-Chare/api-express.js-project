import pool from '../../config/db.js';

// Controller functions with integrated model code

// Get all seasons_relation
const getAllSeasonsRelations = async (req, res) => {
    try {
        const query = 'SELECT * FROM seasons_relation';
        const [relations] = await pool.query(query);
        res.json(relations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get seasons_relation by ID
const getSeasonsRelationById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM seasons_relation WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const relation = rows[0];

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
        const query = 'INSERT INTO seasons_relation SET ?';
        const [result] = await pool.query(query, relation);
        res.json({
            message: 'Relation created successfully',
            id: result.insertId
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
        const query = 'UPDATE seasons_relation SET ? WHERE id = ?';
        const [result] = await pool.query(query, [relation, id]);
        if (result.affectedRows > 0) {
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
        const query = 'DELETE FROM seasons_relation WHERE id = ?';
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows > 0) {
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
