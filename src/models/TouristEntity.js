import pool from '../config/db.js';

const getAllTouristEntities = async () => {
  const [rows] = await pool.query('SELECT * FROM tourist_entities');
  return rows;
};

const getTouristEntityById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tourist_entities WHERE id = ?', [id]);
    return rows[0];
};

// const getTouristEntitiesByCategory = async (categoryId) => {
//     const [rows] = await pool.query('SELECT * FROM tourist_entities WHERE category_id = ?', [categoryId]);
//     return rows;
// };

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

const getTouristEntitiesOpenNow = async (dayOfWeek, currentTime) => {
    const query = `
      SELECT te.*
      FROM tourist_entities te
      JOIN operating_hours oh ON te.id = oh.place_id
      WHERE oh.day_of_week = ? 
        AND ? BETWEEN oh.opening_time AND oh.closing_time
    `;
    const [rows] = await pool.query(query, [dayOfWeek, currentTime]);
    return rows;
};

export default { getAllTouristEntities, getTouristEntityById,getTouristEntitiesByCategory,getTouristEntitiesByDistrict,getTouristEntitiesBySeason,getTouristEntitiesOpenNow };
