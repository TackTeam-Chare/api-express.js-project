import pool from '../../config/db.js';


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
    if (rows[0].images) {
      rows[0].images = rows[0].images.split(',');
    }
    return rows[0];
  };

  // const search = async (query) => {
  //   const searchQuery = `
  //     SELECT te.*, c.name AS category_name, d.name AS district_name, GROUP_CONCAT(ti.image_path) AS images
  //     FROM tourist_entities te
  //     JOIN categories c ON te.category_id = c.id
  //     JOIN district d ON te.district_id = d.id
  //     LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
  //     WHERE te.name LIKE ? OR te.description LIKE ? OR c.name LIKE ? OR d.name LIKE ?
  //     GROUP BY te.id
  //   `;
  //   const [rows] = await pool.query(searchQuery, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);
  //   if (rows.length) {
  //     rows.forEach(row => {
  //       if (row.images) {
  //         row.images = row.images.split(',').map(imagePath => ({
  //           image_path: imagePath,
  //           image_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${imagePath}`
  //         }));
  //       }
  //     });
  //   }
  //   return rows;
  // };
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

const create = async (touristEntity, imagePaths) => {
  const { name, description, location, latitude, longitude, district_id, category_id, created_by } = touristEntity;

  const conn = await pool.getConnection();
  try {
      await conn.beginTransaction();

      const [result] = await conn.query(
          'INSERT INTO tourist_entities (name, description, location, latitude, longitude, district_id, category_id, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [name, description, location, latitude, longitude, district_id, category_id, created_by]
      );

      const tourismEntitiesId = result.insertId;

      if (imagePaths && imagePaths.length > 0) {
          const imageInsertPromises = imagePaths.map((imagePath) =>
              conn.query(
                  'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES (?, ?)',
                  [tourismEntitiesId, imagePath]
              )
          );
          await Promise.all(imageInsertPromises);
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

// controllers/TouristEntityController.js
const update = async (id, touristEntity, imagePaths) => {
  const { name, description, location, latitude, longitude, district_id, category_id } = touristEntity;

  const conn = await pool.getConnection();
  try {
      await conn.beginTransaction();

      const [result] = await conn.query(
          'UPDATE tourist_entities SET name=?, description=?, location=?, latitude=?, longitude=?, district_id=?, category_id=? WHERE id=?',
          [name, description, location, latitude, longitude, district_id, category_id, id]
      );

      await conn.query('DELETE FROM tourism_entities_images WHERE tourism_entities_id = ?', [id]);

      if (imagePaths && imagePaths.length > 0) {
          const imageInsertPromises = imagePaths.map((imagePath) =>
              conn.query(
                  'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES (?, ?)',
                  [id, imagePath]
              )
          );
          await Promise.all(imageInsertPromises);
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
  search,
  createOld,
  updateOld,
  create,
  update,
  remove,
};