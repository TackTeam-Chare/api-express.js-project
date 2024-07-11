import DistrictModel from '../../models/user/District.js';

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
    getTouristEntitiesByDistrict,
};