import pool from '../../config/db.js';
import District from '../auth/DistrictEntityController.js';
import Category from '../auth/CategoryEntityController.js';

// Controller functions with integrated model code
const searchTouristEntities = async (req, res) => {
    const { q } = req.query;
    try {
        const results = await search(q);
        res.json(results);
    } catch (error) {
        console.error('Error searching tourist entities:', error);
        res.status(500).json({ error: error.message });
    }
};

const search = async (query) => {
    const searchQuery = `
        SELECT 
            te.*, 
            c.name AS category_name, 
            d.name AS district_name, 
            GROUP_CONCAT(ti.image_path) AS image_url
        FROM 
            tourist_entities te
        JOIN 
            categories c ON te.category_id = c.id
        JOIN 
            district d ON te.district_id = d.id
        LEFT JOIN 
            tourism_entities_images ti ON te.id = ti.tourism_entities_id
        WHERE 
            te.name LIKE ? OR te.description LIKE ? OR c.name LIKE ? OR d.name LIKE ?
        GROUP BY 
            te.id
    `;
    const [rows] = await pool.query(searchQuery, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);
   
    return rows;
};

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

const getTouristEntityById = async (req, res) => {
    try {
        const id = req.params.id;
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
        const touristEntity = rows[0];
        if (touristEntity && touristEntity.images) {
            touristEntity.images = touristEntity.images.split(',').map(image => ({
                image_path: image,
                image_url: `${process.env.BASE_URL}/uploads/${image}`,
            }));
        }
        if (touristEntity) {
            res.json(touristEntity);
        } else {
            res.status(404).json({ error: 'Tourist entity not found' });
        }
    } catch (error) {
        console.error('Error fetching tourist entity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// const getTouristEntityById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const query = `
//             SELECT 
//                 te.*, 
//                 c.name AS category_name, 
//                 d.name AS district_name, 
//                 GROUP_CONCAT(ti.image_path) AS images
//             FROM tourist_entities te
//             JOIN categories c ON te.category_id = c.id
//             JOIN district d ON te.district_id = d.id
//             LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
//             WHERE te.id = ?
//             GROUP BY te.id
//         `;
//         const [rows] = await pool.query(query, [id]);
//         const touristEntity = rows[0];
//         if (touristEntity && touristEntity.images) {
//             touristEntity.images = touristEntity.images.split(',');
//         }
//         if (touristEntity) {
//             res.json(touristEntity);
//         } else {
//             res.status(404).json({ error: 'Tourist entity not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching tourist entity:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const getNearbyTouristEntitiesHandler = async (req, res) => {
    try {
        const id = req.params.id;
        let { radius = 5000 } = req.query;
        radius = parseInt(radius, 10);
        if (isNaN(radius) || radius <= 0) {
            radius = 5000;
        }
        const entity = await getTouristEntityDetailsById(id);
        if (!entity) {
            return res.status(404).json({ error: 'Tourist entity not found' });
        }
        const nearbyEntities = await getNearbyTouristEntities(entity.latitude, entity.longitude, radius, id);
        res.json({ entity, nearbyEntities });
    } catch (error) {
        console.error('Error fetching tourist entity details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const createTouristEntity = async (req, res) => {
//     const touristEntity = req.body;
//     const imagePaths = req.files.map(file => `${file.filename}`);
//     const { district_name, category_name } = touristEntity;

//     console.log('Received Data:', touristEntity);
//     console.log('Image Paths:', imagePaths);

//     try {
//         const districtId = await District.getIdByName(district_name);
//         const categoryId = await Category.getIdByName(category_name);

//         touristEntity.district_id = districtId;
//         touristEntity.category_id = categoryId;
//         touristEntity.created_by = req.user.id;

//         console.log('Tourist Entity to be Inserted:', touristEntity);

//         const insertId = await create(touristEntity, imagePaths);

//         console.log('Insert ID:', insertId);

//         res.json({
//             message: 'Tourist entity created successfully',
//             id: insertId
//         });
//     } catch (error) {
//         console.error('Error in createTouristEntity:', error);
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// const updateTouristEntity = async (req, res) => {
//     const id = req.params.id;
//     const touristEntity = req.body;
//     const imagePaths = req.files.map(file => `${file.filename}`);
//     const { district_name, category_name } = touristEntity;

//     try {
//         const districtId = await District.getIdByName(district_name);
//         const categoryId = await Category.getIdByName(category_name);

//         touristEntity.district_id = districtId;
//         touristEntity.category_id = categoryId;

//         const affectedRows = await update(id, touristEntity, imagePaths);
//         if (affectedRows > 0) {
//             res.json({
//                 message: `Tourist entity with ID ${id} updated successfully`
//             });
//         } else {
//             res.status(404).json({
//                 error: 'Tourist entity not found'
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         });
//     }
// };

// const create = async (touristEntity, imagePaths) => {
//     const { name, description, location, latitude, longitude, district_id, category_id, created_by } = touristEntity;

//     const conn = await pool.getConnection();
//     try {
//         await conn.beginTransaction();

//         const [result] = await conn.query(
//             'INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//             [name, description, location, latitude, longitude, district_id, category_id, created_by]
//         );

//         const tourismEntitiesId = result.insertId;

//         if (imagePaths && imagePaths.length > 0) {
//             const imageInsertPromises = imagePaths.map((imagePath) =>
//                 conn.query(
//                     'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES (?, ?)',
//                     [tourismEntitiesId, imagePath]
//                 )
//             );
//             await Promise.all(imageInsertPromises);
//         }

//         await conn.commit();
//         return tourismEntitiesId;
//     } catch (error) {
//         await conn.rollback();
//         throw error;
//     } finally {
//         conn.release();
//     }
// };

// const update = async (id, touristEntity, imagePaths) => {
//     const { name, description, location, latitude, longitude, district_id, category_id } = touristEntity;

//     const conn = await pool.getConnection();
//     try {
//         await conn.beginTransaction();

//         const [result] = await conn.query(
//             'UPDATE tourist_entities SET name=?, description=?, location=?, latitude=?, longitude=?, district_id=?, category_id=? WHERE id=?',
//             [name, description, location, latitude, longitude, district_id, category_id, id]
//         );

//         await conn.query('DELETE FROM tourism_entities_images WHERE tourism_entities_id = ?', [id]);

//         if (imagePaths && imagePaths.length > 0) {
//             const imageInsertPromises = imagePaths.map((imagePath) =>
//                 conn.query(
//                     'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES (?, ?)',
//                     [id, imagePath]
//                 )
//             );
//             await Promise.all(imageInsertPromises);
//         }

//         await conn.commit();
//         return result.affectedRows;
//     } catch (error) {
//         await conn.rollback();
//         throw error;
//     } finally {
//         conn.release();
//     }
// };
// Delete a tourist entity
const deleteTouristEntity = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await remove(id);
        if (affectedRows > 0) {
            res.json({
                message: `Tourist entity with ID ${id} deleted successfully`
            });
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// Model functions

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
    return rows;
};

const remove = async (id) => {
    try {
        const result = await pool.query('DELETE FROM tourist_entities WHERE id = ?', [id]);
        return result[0].affectedRows;
    } catch (error) {
        throw error;
    }
};


// ฟังก์ชันสร้างสถานที่ท่องเที่ยว
const createTouristEntity = async (req, res) => {
    const touristEntity = req.body;
    const imagePath = req.file.filename; // รับเฉพาะ 1 รูปภาพ
    const { district_name, category_name } = touristEntity;

    console.log('Received Data:', touristEntity);
    console.log('Image Path:', imagePath);

    try {
        const districtId = await District.getIdByName(district_name);
        const categoryId = await Category.getIdByName(category_name);

        touristEntity.district_id = districtId;
        touristEntity.category_id = categoryId;
        touristEntity.created_by = req.user.id;

        console.log('Tourist Entity to be Inserted:', touristEntity);

        const insertId = await create(touristEntity, imagePath);

        console.log('Insert ID:', insertId);

        res.json({
            message: 'Tourist entity created successfully',
            id: insertId
        });
    } catch (error) {
        console.error('Error in createTouristEntity:', error);
        res.status(500).json({
            error: error.message
        });
    }
};

// ฟังก์ชันอัปเดตสถานที่ท่องเที่ยว
const updateTouristEntity = async (req, res) => {
    const id = req.params.id;
    const touristEntity = req.body;
    const imagePath = req.file.filename; // รับเฉพาะ 1 รูปภาพ
    const { district_name, category_name } = touristEntity;

    try {
        const districtId = await District.getIdByName(district_name);
        const categoryId = await Category.getIdByName(category_name);

        touristEntity.district_id = districtId;
        touristEntity.category_id = categoryId;

        const affectedRows = await update(id, touristEntity, imagePath);
        if (affectedRows > 0) {
            res.json({
                message: `Tourist entity with ID ${id} updated successfully`
            });
        } else {
            res.status(404).json({
                error: 'Tourist entity not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// ฟังก์ชันสร้างข้อมูลสถานที่ท่องเที่ยว
const create = async (touristEntity, imagePath) => {
    const { name, description, location, latitude, longitude, district_id, category_id, created_by } = touristEntity;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.query(
            'INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, location, latitude, longitude, district_id, category_id, created_by]
        );

        const tourismEntitiesId = result.insertId;

        if (imagePath) {
            await conn.query(
                'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES (?, ?)',
                [tourismEntitiesId, imagePath]
            );
        }

        await conn.commit();
        return tourismEntitiesId;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

// ฟังก์ชันอัปเดตข้อมูลสถานที่ท่องเที่ยว
const update = async (id, touristEntity, imagePath) => {
    const { name, description, location, latitude, longitude, district_id, category_id } = touristEntity;

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [result] = await conn.query(
            'UPDATE tourist_entities SET name=?, description=?, location=?, latitude=?, longitude=?, district_id=?, category_id=? WHERE id=?',
            [name, description, location, latitude, longitude, district_id, category_id, id]
        );

        await conn.query('DELETE FROM tourism_entities_images WHERE tourism_entities_id = ?', [id]);

        if (imagePath) {
            await conn.query(
                'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES (?, ?)',
                [id, imagePath]
            );
        }

        await conn.commit();
        return result.affectedRows;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

export default {
    searchTouristEntities,
    search,
    getAllTouristEntities,
    getTouristEntityById,
    getNearbyTouristEntitiesHandler,
    createTouristEntity,
    updateTouristEntity,
    deleteTouristEntity,
   
};
