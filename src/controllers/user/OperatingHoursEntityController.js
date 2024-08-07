import pool from '../../config/db.js';

// Controller functions with integrated model code

const getAllOperatingHours = async (req, res) => {
    try {
        const query = 'SELECT * FROM operating_hours';
        const [operatingHours] = await pool.query(query);
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
    getOperatingHoursById,
    getTouristEntitiesByTime
};
