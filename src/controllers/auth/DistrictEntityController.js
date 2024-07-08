import DistrictModel from '../../models/auth/District.js';

const getAllDistricts = async (req, res) => {
    try {
        const districts = await DistrictModel.getAllDistricts();
        res.json(districts);
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


// Get district by ID
const getDistrictById = async (req, res) => {
    try {
        const id = req.params.id;
        const district = await DistrictModel.getDistrictById(id);
        if (district) {
            res.json(district);
        } else {
            res.status(404).json({ error: 'District not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new district
const createDistrict = async (req, res) => {
    const district = req.body;
    try {
        const insertId = await DistrictModel.create(district);
        res.json({
            message: 'District created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a district
const updateDistrict = async (req, res) => {
    const id = req.params.id;
    const district = req.body;
    try {
        const affectedRows = await DistrictModel.update(id, district);
        if (affectedRows > 0) {
            res.json({ message: `District with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'District not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a district
const deleteDistrict = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await DistrictModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `District with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'District not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTouristEntitiesByDistrict = async (req, res) => {
    try {
        const id = req.params.id;
        const entities = await DistrictModel.getTouristEntitiesByDistrict(id);
        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by district:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export default {
    getAllDistricts,
    getDistrictById,
    createDistrict,
    updateDistrict,
    deleteDistrict,
    getTouristEntitiesByDistrict,
};