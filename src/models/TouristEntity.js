import pool from '../config/db.js';


const getAllTouristEntities = async () => {
  const query = `
      SELECT te.*, c.name AS category_name, d.name AS district_name, ti.image_path
      FROM tourist_entities te
      JOIN categories c ON te.category_id = c.id
      JOIN district d ON te.district_id = d.id
      LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
  `;
  const [rows] = await pool.query(query);
  return rows;
};

const getTouristEntityById = async (id) => {
  const query = `
      SELECT te.*, c.name AS category_name, d.name AS district_name, ti.image_path
      FROM tourist_entities te
      JOIN categories c ON te.category_id = c.id
      JOIN district d ON te.district_id = d.id
      LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
      WHERE te.id = ?
  `;
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};


const getTouristEntitiesByCategory = async (categoryId) => {
  const query = `
      SELECT te.*, c.name AS category_name
      FROM tourist_entities te
      JOIN categories c ON te.category_id = c.id
      WHERE te.category_id = ?
  `;
  const [rows] = await pool.query(query, [categoryId]);
  return rows;
};



const getTouristEntitiesByDistrict = async (districtId) => {
  const query = `
      SELECT te.*, d.name AS district_name
      FROM tourist_entities te
      INNER JOIN district d ON te.district_id = d.id
      WHERE te.district_id = ?
  `;
  const [rows] = await pool.query(query, [districtId]);
  return rows;
};



const getTouristEntitiesBySeason = async (seasonId) => {
  const query = `
      SELECT te.*, s.name AS season_name
      FROM tourist_entities te
      JOIN seasons_relation sr ON te.id = sr.tourism_entities_id
      JOIN seasons s ON sr.season_id = s.id
      WHERE sr.season_id = ?
    `;
  const [rows] = await pool.query(query, [seasonId]);
  return rows;
};

const getNearbyTouristEntities = async (latitude, longitude, radius) => {
  const query = `
      SELECT te.*, 
             (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance
      FROM tourist_entities te
      HAVING distance < ?
      ORDER BY distance
  `;
  const [rows] = await pool.query(query, [latitude, longitude, latitude, radius]);
  return rows;
};


export default {
  getAllTouristEntities,
  getTouristEntityById,
  getTouristEntitiesByCategory,
  getTouristEntitiesByDistrict,
  getTouristEntitiesBySeason,
  getNearbyTouristEntities
};