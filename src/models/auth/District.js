import pool from '../../config/db.js';


// Get all districts
const getAllDistricts = async () => {
    const query = 'SELECT * FROM district';
    const [rows] = await pool.query(query);
    return rows;
};

  const getDistrictById = async (id) => {
    const query = 'SELECT * FROM district WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  };
  
  const create = async (district) => {
    const query = 'INSERT INTO district SET ?';
    const [result] = await pool.query(query, district);
    return result.insertId;
  };
  
  const update = async (id, district) => {
    const query = 'UPDATE district SET ? WHERE id = ?';
    const [result] = await pool.query(query, [district, id]);
    return result.affectedRows;
  };
  
  const remove = async (id) => {
    const query = 'DELETE FROM district WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result.affectedRows;
  };

const getTouristEntitiesByDistrict = async (districtId) => {
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
  return rows;
};

export default {
  getAllDistricts,
  getDistrictById,
  create,
  update,
  remove,
  getTouristEntitiesByDistrict
};