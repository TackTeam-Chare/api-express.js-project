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



const getNearbyTouristEntities = async (latitude, longitude, distance) => {
  const query = `
      SELECT te.*, 
             c.name AS category_name, 
             d.name AS district_name,
             ST_Distance_Sphere(
                 point(te.longitude, te.latitude), 
                 point(?, ?)
             ) AS distance,
             GROUP_CONCAT(ti.image_path) AS images
      FROM tourist_entities te
      JOIN categories c ON te.category_id = c.id
      JOIN district d ON te.district_id = d.id
      LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
      WHERE ST_Distance_Sphere(
                point(te.longitude, te.latitude), 
                point(?, ?)
            ) < ?
      GROUP BY te.id
      ORDER BY distance;
  `;
  const [rows] = await pool.query(query, [longitude, latitude, longitude, latitude, distance]);
  return rows;
};



const getTouristEntityDetailsById = async (id) => {
  const query = `
      SELECT te.*, 
             c.name AS category_name,
             d.name AS district_name,
             GROUP_CONCAT(CONCAT(oh.day_of_week, ' ', oh.opening_time, '-', oh.closing_time)) AS opening_hours,
             GROUP_CONCAT(CONCAT(s.name, ' (', s.date_start, ' - ', s.date_end, ')')) AS seasons,
             GROUP_CONCAT(ti.image_path) AS images
      FROM tourist_entities te
      JOIN categories c ON te.category_id = c.id
      JOIN district d ON te.district_id = d.id
      LEFT JOIN operating_hours oh ON te.id = oh.place_id
      LEFT JOIN seasons_relation sr ON te.id = sr.tourism_entities_id
      LEFT JOIN seasons s ON sr.season_id = s.id
      LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
      WHERE te.id = ?
      GROUP BY te.id;
  `;
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};





export default {
  getAllTouristEntities,
  getTouristEntityById,
  getTouristEntitiesByCategory,
  getTouristEntitiesByDistrict,
  getTouristEntitiesBySeason,
  getNearbyTouristEntities,
  getTouristEntityDetailsById,
};