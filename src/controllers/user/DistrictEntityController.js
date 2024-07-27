import pool from '../../config/db.js';

const getAllDistricts = async (req, res) => {
    try {
        const query = 'SELECT * FROM district';
        const [districts] = await pool.query(query);
        res.json(districts);
    } catch (error) {
        console.error('Error fetching districts:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getDistrictById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM district WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const district = rows[0];

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
        const query = `
            SELECT
                te.id,
                te.name,
                te.description,
                te.location,
                te.latitude,
                te.longitude,
                d.name AS district_name,
                c.name AS category_name,
                GROUP_CONCAT(DISTINCT ti.image_path) AS image_url,
                GROUP_CONCAT(DISTINCT s.name) AS seasons
            FROM
                tourist_entities te
            INNER JOIN
                district d ON te.district_id = d.id
            INNER JOIN
                categories c ON te.category_id = c.id
            LEFT JOIN
                tourism_entities_images ti ON te.id = ti.tourism_entities_id
            LEFT JOIN
                seasons_relation sr ON te.id = sr.tourism_entities_id
            LEFT JOIN
                seasons s ON sr.season_id = s.id
            WHERE
                te.district_id = ?
            GROUP BY
                te.id;
        `;
        const [rows] = await pool.query(query, [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tourist entities by district:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getIdByName = async (name) => {
    const [rows] = await pool.query('SELECT id FROM district WHERE name = ?', [name]);
    if (rows.length > 0) {
        return rows[0].id;
    } else {
        throw new Error(`District '${name}' not found`);
    }
};

export default {
    getAllDistricts,
    getDistrictById,
    getTouristEntitiesByDistrict
};
