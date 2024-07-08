import TimeModel from '../models/Time.js';

const getAllOperatingHours = async (req, res) => {
    try {
        const operatingHours = await TimeModel.getAllOperatingHours();
        res.json(operatingHours);
    } catch (error) {
        console.error('Error fetching operating hours:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getOperatingHoursById = async (req, res) => {
    try {
        const id = req.params.id;
        const operatingHours = await TimeModel.getOperatingHoursById(id);

        if (operatingHours) {
            res.json(operatingHours);
        } else {
            res.status(404).json({
                error: 'Operating hours not found for the tourist entity'
            });
        }
    } catch (error) {
        console.error('Error fetching operating hours:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};
const getTouristEntitiesByTime = async (req, res) => {
    try {
        const { day_of_week, opening_time, closing_time } = req.query;
        console.log('Request parameters:', day_of_week, opening_time, closing_time); // แสดงค่าพารามิเตอร์ที่ส่งมาใน request

        const entities = await TimeModel.getTouristEntitiesByTime(day_of_week, opening_time, closing_time);
        console.log('Entities fetched:', entities); // แสดงข้อมูลที่ได้รับกลับมาจากฟังก์ชัน getTouristEntitiesByTime

        res.json(entities);
    } catch (error) {
        console.error('Error fetching tourist entities by time:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


export default {
    getAllOperatingHours,
    getOperatingHoursById,
    getTouristEntitiesByTime
};