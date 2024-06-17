import pool from '../config/db.js';

// Get all tourist entities
const getAll = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM tourist_entities');
        return rows;
    } catch (error) {
        throw error;
    }
};

// Get a tourist entity by ID
const getById = async (id) => {
    try {
        console.log(`Fetching entity with ID: ${id}`);
        const [rows] = await pool.query('SELECT * FROM tourist_entities WHERE id = ?', [id]);
        console.log(`Fetched entity:`, rows[0]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};


const create = async (touristEntity) => {
    const {name, description, location, latitude, longitude, district_id, category_id, created_by } = touristEntity;
    if (!created_by) {
        throw new Error("created_by cannot be null");
    }
    try {
        const result = await pool.query('INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, description, location, latitude, longitude, district_id, category_id, created_by]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
};
// Update a tourist entity
const update = async (id, touristEntity) => {
    const { name, description, location, latitude, longitude, district_id, category_id } = touristEntity;
    try {
        const result = await pool.query('UPDATE tourist_entities SET name=?, description=?, location=?, latitude=?, longitude=?, district_id=?, category_id=? WHERE id=?', [name, description, location, latitude, longitude, district_id, category_id, id]);
        return result[0].affectedRows; // คืนค่า affectedRows ที่ได้จากการอัปเดต
    } catch (error) {
        throw error;
    }
};

// Delete a tourist entity
const remove = async (id) => {
    try {
        const result = await pool.query('DELETE FROM tourist_entities WHERE id = ?', [id]);
        return result[0].affectedRows; // คืนค่า affectedRows ที่ได้จากการลบ
    } catch (error) {
        throw error;
    }
};


export default {
    getAll,
    getById,
    create,
    update,
    remove,

};
