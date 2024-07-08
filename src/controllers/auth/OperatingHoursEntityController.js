import TimeModel from '../../models/auth/Time.js';

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

// Create a new operating hours
const createOperatingHours = async (req, res) => {
    const operatingHour = req.body;
    try {
        const insertId = await TimeModel.create(operatingHour);
        res.json({
            message: 'Operating hours created successfully',
            id: insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an operating hours
const updateOperatingHours = async (req, res) => {
    const id = req.params.id;
    const operatingHour = req.body;
    try {
        const affectedRows = await TimeModel.update(id, operatingHour);
        if (affectedRows > 0) {
            res.json({ message: `Operating hours with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Operating hours not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an operating hours
const deleteOperatingHours = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await TimeModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Operating hours with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Operating hours not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    createOperatingHours,
    updateOperatingHours,
    deleteOperatingHours,
    getOperatingHoursById,
    getTouristEntitiesByTime
};