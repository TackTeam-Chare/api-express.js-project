import pool from '../../config/db.js';

const getAllCategories = async (req, res) => {
    try {
        const query = 'SELECT * FROM categories';
        const [categories] = await pool.query(query);
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'SELECT * FROM categories WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        const category = rows[0];

        if (category) {
            res.json(category);
        } else {
            res.status(404).json({
                error: 'Category not found'
            });
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getTouristEntitiesByCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const query = `
            SELECT 
                te.*, 
                c.name AS category_name,
                GROUP_CONCAT(DISTINCT tei.image_path) AS image_url,
                GROUP_CONCAT(DISTINCT s.name ORDER BY s.date_start) AS seasons
            FROM 
                tourist_entities te
                JOIN categories c ON te.category_id = c.id
                LEFT JOIN tourism_entities_images tei ON te.id = tei.tourism_entities_id
                LEFT JOIN seasons_relation sr ON te.id = sr.tourism_entities_id
                LEFT JOIN seasons s ON sr.season_id = s.id
            WHERE 
                te.category_id = ?
            GROUP BY 
                te.id
        `;

        const hoursQuery = `
            SELECT 
                oh.place_id, 
                oh.day_of_week, 
                oh.opening_time, 
                oh.closing_time 
            FROM 
                operating_hours oh 
            JOIN tourist_entities te ON oh.place_id = te.id
            WHERE 
                te.category_id = ?
        `;

        const [rows] = await pool.query(query, [id]);
        const [hoursRows] = await pool.query(hoursQuery, [id]);

        rows.forEach(row => {
            row.operating_hours = hoursRows.filter(hour => hour.place_id === row.id);
        });

        res.json(rows);
    } catch (error) {
        console.error('Error fetching tourist entities by category:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};



export default {
    getAllCategories,
    getCategoryById,
    getTouristEntitiesByCategory,
};

