import pool from '../../config/db.js';

// Controller functions with integrated model code

// const getAllOperatingHours = async (req, res) => {
//     try {
//         const query = 'SELECT * FROM operating_hours';
//         const [operatingHours] = await pool.query(query);
//         res.json(operatingHours);
//     } catch (error) {
//         console.error('Error fetching operating hours:', error);
//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };
const getAllOperatingHours = async (req, res) => {
    try {
        const query = `
            SELECT 
                oh.*, 
                te.name AS place_name 
            FROM 
                operating_hours oh 
            JOIN 
                tourist_entities te 
            ON 
                oh.place_id = te.id
        `;
        const [operatingHours] = await pool.query(query);
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
        const query = 'INSERT INTO operating_hours SET ?';
        const [result] = await pool.query(query, operatingHour);
        res.json({
            message: 'Operating hours created successfully',
            id: result.insertId
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
        const query = 'UPDATE operating_hours SET ? WHERE id = ?';
        const [result] = await pool.query(query, [operatingHour, id]);
        if (result.affectedRows > 0) {
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
        const query = 'DELETE FROM operating_hours WHERE id = ?';
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows > 0) {
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
        const query = 'SELECT * FROM operating_hours WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const operatingHours = rows[0];

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
        const { day_of_week, opening_time, closing_time } = req.params;
        console.log('Request parameters:', day_of_week, opening_time, closing_time);

        let query = `
            SELECT 
                te.*,
                d.name AS district_name,
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        oh.day_of_week, ': ', 
                        TIME_FORMAT(oh.opening_time, '%h:%i %p'), ' - ', 
                        TIME_FORMAT(oh.closing_time, '%h:%i %p')
                    ) ORDER BY oh.day_of_week SEPARATOR '\n'
                ) AS operating_hours,
                (SELECT image_path FROM tourism_entities_images WHERE tourism_entities_id = te.id LIMIT 1) AS image_url
            FROM
                tourist_entities te
                JOIN district d ON te.district_id = d.id
                LEFT JOIN operating_hours oh ON te.id = oh.place_id
            WHERE
                1 = 1
        `;
        const params = [];
        if (day_of_week && opening_time && closing_time) {
            query += `
                AND oh.day_of_week = ?
                AND oh.opening_time <= ?
                AND oh.closing_time >= ?
            `;
            params.push(day_of_week, opening_time, closing_time);
        }
        query += `
            GROUP BY 
                te.id
        `;
        const [rows] = await pool.query(query, params);
        console.log('Entities fetched:', rows);

        res.json(rows);
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
