import TouristModel from '../../models/user/TouristEntity.js';

//  ดึงสถานที่ทั้งหมดในฐานข้อมูล
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

// ดึงสถานที่ของเเต่ละไอดี
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


// สถานที่เลือกเเละสถานที่ใกล้เคียง

// const getNearbyTouristEntitiesHandler = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let {
//             radius = 1500
//         } = req.query;
//         radius = parseInt(radius, 10);
//         if (isNaN(radius) || radius <= 0) {
//             radius = 1500;
//         }

//         const entity = await TouristEntity.getTouristEntityDetailsById(id);
//         if (!entity) {
//             return res.status(404).json({
//                 error: 'Tourist entity not found'
//             });
//         }

//         const nearbyEntities = await TouristEntity.getNearbyTouristEntities(entity.latitude, entity.longitude, radius);

//         res.json({
//             entity,
//             nearbyEntities
//         });
//     } catch (error) {
//         console.error('Error fetching tourist entity details:', error);
//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };

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

        // ดึงข้อมูลสถานที่ท่องเที่ยวใกล้เคียง โดยไม่รวมตัวเอง
        const nearbyEntities = await TouristModel.getNearbyTouristEntities(entity.latitude, entity.longitude, radius, id);

        res.json({ entity, nearbyEntities });
    } catch (error) {
        console.error('Error fetching tourist entity details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    getAllTouristEntities,
    getTouristEntityById,
    getNearbyTouristEntitiesHandler,
};