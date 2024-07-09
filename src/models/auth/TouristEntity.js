import pool from '../../config/db.js';
import DistrictModel from '../../models/auth/District.js';
import CategoryModel from '../../models/auth/Category.js';
import SeasonModel from '../../models/auth/Season.js';

const getAllTouristEntities = async () => {
  const query = `
     SELECT te.*, c.name AS category_name, d.name AS district_name, ti.image_path
FROM tourist_entities te
JOIN categories c ON te.category_id = c.id
JOIN district d ON te.district_id = d.id
LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id;
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


// const getNearbyTouristEntities = async (latitude, longitude, distance) => {
//   const query = `
//       SELECT te.*, 
//              c.name AS category_name, 
//              d.name AS district_name,
//              ST_Distance_Sphere(
//                  point(te.longitude, te.latitude), 
//                  point(?, ?)
//              ) AS distance,
//              GROUP_CONCAT(ti.image_path) AS image_path,
//               oh.day_of_week,
//               oh.opening_time,
//               oh.closing_time
//       FROM tourist_entities te
//       JOIN categories c ON te.category_id = c.id
//       JOIN district d ON te.district_id = d.id
//       LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
//       LEFT JOIN operating_hours oh ON te.id = oh.place_id
//       WHERE ST_Distance_Sphere(
//                 point(te.longitude, te.latitude), 
//                 point(?, ?)
//             ) < ?
//       GROUP BY te.id,oh.day_of_week
//       ORDER BY distance;
//   `;
//   const [rows] = await pool.query(query, [longitude, latitude, longitude, latitude, distance]);
//   return rows;
// };

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
      WHERE te.id != ? AND ST_Distance_Sphere(
                point(te.longitude, te.latitude), 
                point(?, ?)
            ) < ?
      GROUP BY te.id
      ORDER BY distance;
  `;
  const [rows] = await pool.query(query, [longitude, latitude, excludeId, longitude, latitude, distance]);
  return rows;
};

const getTouristEntityDetailsById = async (id) => {
  const query = `
      SELECT te.*,
             c.name AS category_name,
             d.name AS district_name,
             GROUP_CONCAT(CONCAT(oh.day_of_week, ' ', oh.opening_time, '-', oh.closing_time)) AS opening_hours,
             GROUP_CONCAT(CONCAT(s.name, ' (', s.date_start, ' - ', s.date_end, ')')) AS seasons,
             GROUP_CONCAT(ti.image_path) AS image_path
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

// const create = async (touristEntity) => {
//   const {name, description, location, latitude, longitude, district_id, category_id, created_by } = touristEntity;
//   if (!created_by) {
//       throw new Error("created_by cannot be null");
//   }
//   try {
//       const result = await pool.query('INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, description, location, latitude, longitude, district_id, category_id, created_by]);
//       return result.insertId;
//   } catch (error) {
//       throw error;
//   }
// };

// TouristEntity.js
const createOld = async (touristEntity, createdBy) => {
  const { name, description, location, latitude, longitude, district_id, category_id } = touristEntity;
  try {
      const result = await pool.query('INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, description, location, latitude, longitude, district_id, category_id, createdBy]);
      return result.insertId;
  } catch (error) {
      throw error;
  }
};


// Update a tourist entity
const updateOld = async (id, touristEntity) => {
  const { name, description, location, latitude, longitude, district_id, category_id } = touristEntity;
  try {
      const result = await pool.query('UPDATE tourist_entities SET name=?, description=?, location=?, latitude=?, longitude=?, district_id=?, category_id=? WHERE id=?', [name, description, location, latitude, longitude, district_id, category_id, id]);
      return result[0].affectedRows; // คืนค่า affectedRows ที่ได้จากการอัปเดต
  } catch (error) {
      throw error;
  }
};



const create = async (touristEntity) => {
    const { name, description, location, latitude, longitude, district_name, category_name, season_name, created_by } = touristEntity;

    if (district_name && category_name && season_name) {
        const districtId = await DistrictModel.getIdByName(district_name);
        const categoryId = await CategoryModel.getIdByName(category_name);
        const seasonId = await SeasonModel.getIdByName(season_name);
        touristEntity.district_id = districtId;
        touristEntity.category_id = categoryId;
        touristEntity.season_id = seasonId;
    }

    if (!created_by) {
        touristEntity.created_by = req.user.id;
    }

    try {
        const result = await pool.query('INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, season_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, description, location, latitude, longitude, touristEntity.district_id, touristEntity.category_id, touristEntity.season_id, touristEntity.created_by]);
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

const update = async (id, touristEntity) => {
    const { name, description, location, latitude, longitude, district_name, category_name, season_name } = touristEntity;

    if (district_name && category_name && season_name) {
        const districtId = await DistrictModel.getIdByName(district_name);
        const categoryId = await CategoryModel.getIdByName(category_name);
        const seasonId = await SeasonModel.getIdByName(season_name);
        touristEntity.district_id = districtId;
        touristEntity.category_id = categoryId;
        touristEntity.season_id = seasonId;
    }

    try {
        const result = await pool.query('UPDATE tourist_entities SET name=?, description=?, location=?, latitude=?, longitude=?, district_id=?, category_id=?, season_id=? WHERE id=?', [name, description, location, latitude, longitude, touristEntity.district_id, touristEntity.category_id, touristEntity.season_id, id]);
        return result[0].affectedRows;
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
  getAllTouristEntities,
  getTouristEntityById,
  getNearbyTouristEntities,
  getTouristEntityDetailsById,
  createOld,
  updateOld,
  create,
  update,
  remove,
};