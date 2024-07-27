import pool from '../../config/db.js';

// Controller functions with integrated model code

//  ดึงสถานที่ทั้งหมดในฐานข้อมูล
const getAllTouristEntities = async (req, res) => {
    try {
        const query = `
            SELECT te.*, c.name AS category_name, d.name AS district_name, ti.image_path
            FROM tourist_entities te
            JOIN categories c ON te.category_id = c.id
            JOIN district d ON te.district_id = d.id
            LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id;
        `;
        const [entities] = await pool.query(query);
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
        const query = `
            SELECT te.*, c.name AS category_name, d.name AS district_name, ti.image_path
            FROM tourist_entities te
            JOIN categories c ON te.category_id = c.id
            JOIN district d ON te.district_id = d.id
            LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
            WHERE te.id = ?
        `;
        const [rows] = await pool.query(query, [id]);
        const touristEntity = rows[0];

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

const getTouristEntityDetailsById = async (id) => {
    const query = `
        SELECT 
            te.*, 
            c.name AS category_name, 
            d.name AS district_name, 
            GROUP_CONCAT(ti.image_path) AS images
        FROM tourist_entities te
        JOIN categories c ON te.category_id = c.id
        JOIN district d ON te.district_id = d.id
        LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
        WHERE te.id = ?
        GROUP BY te.id
    `;
    const [rows] = await pool.query(query, [id]);
    if (rows.length && rows[0].images) {
        rows[0].images = rows[0].images.split(',').map(imagePath => ({
            image_path: imagePath,
            image_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imagePath}`
        }));
    }
    return rows[0];
};

const getNearbyTouristEntitiesHandler = async (req, res) => {
    try {
        const id = req.params.id;
        let {
            radius = 5000
        } = req.query;
        radius = parseInt(radius, 10);
        if (isNaN(radius) || radius <= 0) {
            radius = 5000;
        }
        const entity = await getTouristEntityDetailsById(id);
        if (!entity) {
            return res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
        const nearbyEntities = await getNearbyTouristEntities(entity.latitude, entity.longitude, radius, id);
        res.json({
            entity,
            nearbyEntities
        });
    } catch (error) {
        console.error('Error fetching tourist entity details:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getNearbyTouristEntities = async (latitude, longitude, distance, excludeId) => {
    const query = `
        SELECT te.*,
            c.name AS category_name,
            d.name AS district_name,
            ST_Distance_Sphere(
                point(te.longitude, te.latitude),
                point(?, ?)
            ) AS distance,
            (SELECT GROUP_CONCAT(image_path)
            FROM tourism_entities_images
            WHERE tourism_entities_id = te.id) AS image_path,
            GROUP_CONCAT(DISTINCT oh.day_of_week) AS days_of_week,
            GROUP_CONCAT(DISTINCT oh.opening_time) AS opening_times,
            GROUP_CONCAT(DISTINCT oh.closing_time) AS closing_times
        FROM tourist_entities te
        JOIN categories c ON te.category_id = c.id
        JOIN district d ON te.district_id = d.id
        LEFT JOIN operating_hours oh ON te.id = oh.place_id
        WHERE te.id != ? AND te.latitude BETWEEN -90 AND 90 AND te.longitude BETWEEN -180 AND 180
            AND ST_Distance_Sphere(
                    point(te.longitude, te.latitude), 
                    point(?, ?)
                ) < ?
        GROUP BY te.id
        ORDER BY distance;
    `;
    const [rows] = await pool.query(query, [longitude, latitude, excludeId, longitude, latitude, distance]);
    rows.forEach(row => {
        if (row.image_path) {
            row.image_path = row.image_path.split(',').map(imagePath => ({
                image_path: imagePath,
                image_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imagePath}`
            }));
        }
    });
    return rows;
};

export default {
    getAllTouristEntities,
    getTouristEntityById,
    getNearbyTouristEntitiesHandler,
    getTouristEntityDetailsById,
    getNearbyTouristEntities

};