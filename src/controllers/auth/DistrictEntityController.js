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

const getTouristEntitiesByDistrict = async (req, res) => {
    try {
        const districtId = req.params.districtId;
        const entities = await DistrictModel.getTouristEntitiesByDistrict(districtId);
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
    getTouristEntitiesByDistrict,
};