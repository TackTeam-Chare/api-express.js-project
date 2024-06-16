import pool from '../config/db.js';

const getAllTouristEntities = async () => {
  const [rows] = await pool.query('SELECT * FROM tourist_entities');
  return rows;
};

const getTouristEntityById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tourist_entities WHERE id = ?', [id]);
    return rows[0];
};

const getTouristEntitiesByCategory = async (categoryId) => {
    const [rows] = await pool.query('SELECT * FROM tourist_entities WHERE category_id = ?', [categoryId]);
    return rows;
};

const getTouristEntitiesByDistrict = async (districtId) => {
    const [rows] = await pool.query('SELECT * FROM tourist_entities WHERE district_id = ?', [districtId]);
    return rows;
};



export default { getAllTouristEntities, getTouristEntityById,getTouristEntitiesByCategory,getTouristEntitiesByDistrict };
