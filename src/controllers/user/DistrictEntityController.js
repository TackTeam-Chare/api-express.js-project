import pool from '../../config/db.js';

// Controller functions with integrated model code

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
        const districtId = req.params.id;
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
                GROUP_CONCAT(DISTINCT ti.image_path) AS images,
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
        const [rows] = await pool.query(query, [districtId]);
        res.json(rows);
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
    getTouristEntitiesByDistrict
};
