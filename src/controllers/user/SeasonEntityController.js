import pool from '../../config/db.js';

// Controller functions with integrated model code

const getAllSeasons = async (req, res) => {
    try {
        const query = 'SELECT * FROM seasons';
        const [seasons] = await pool.query(query);
        res.json(seasons);
    } catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

// Get season by ID
const getSeasonById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM seasons WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const season = rows[0];

        if (season) {
            res.json(season);
        } else {
            res.status(404).json({ error: 'Season not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTouristEntitiesBySeason = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `
            SELECT
                te.*,
                s.name AS season_name, 
                ti.image_path AS image_url,
                d.name AS district_name,
                GROUP_CONCAT(
                    DISTINCT CONCAT(
                        oh.day_of_week, ': ',
                        TIME_FORMAT(oh.opening_time, '%h:%i %p'), ' - ',
                        TIME_FORMAT(oh.closing_time, '%h:%i %p')
                    ) ORDER BY oh.day_of_week SEPARATOR '\n'
                ) AS operating_hours
            FROM
                tourist_entities te
                JOIN seasons_relation sr ON te.id = sr.tourism_entities_id
                JOIN seasons s ON sr.season_id = s.id
                LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
                LEFT JOIN operating_hours oh ON te.id = oh.place_id
                JOIN district d ON te.district_id = d.id
            WHERE 
                sr.season_id = ?
            GROUP BY 
                te.id
        `;
        const [rows] = await pool.query(query, [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tourist entities by season:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export default {
    getAllSeasons,
    getSeasonById,
    getTouristEntitiesBySeason
};
