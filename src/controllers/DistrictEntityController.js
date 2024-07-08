import DistrictModel from '../models/District.js';

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
    getTouristEntitiesByDistrict,
};