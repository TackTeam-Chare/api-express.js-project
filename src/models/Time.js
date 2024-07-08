import pool from '../config/db.js';

const getOperatingHoursById = async (id) => {
    const query = `
        SELECT *
        FROM operating_hours
        WHERE place_id = ?
    `;
    const [rows] = await pool.query(query, [id]);
    // console.log('Generated SQL query:', rows); 
    return rows;
  };

  const getTouristEntitiesByTime = async (day_of_week, opening_time, closing_time) => {
    let query = `
      SELECT 
        te.*,
        d.name AS district_name,
        GROUP_CONCAT(
          DISTINCT CONCAT(
            oh.day_of_week, ': ', 
            TIME_FORMAT(oh.opening_time, '%h:%i %p'), ' - ', 
            TIME_FORMAT(oh.closing_time, '%h:%i %p')
          ) ORDER BY oh.day_of_week SEPARATOR '\n'
        ) AS operating_hours,
        (SELECT image_path FROM tourism_entities_images WHERE tourism_entities_id = te.id LIMIT 1) AS image_url
      FROM
        tourist_entities te
        JOIN district d ON te.district_id = d.id
        LEFT JOIN operating_hours oh ON te.id = oh.place_id
      WHERE
        1 = 1
    `;
  
    const params = [];
    if (day_of_week && opening_time && closing_time) {
      query += `
        AND oh.day_of_week = ?
        AND oh.opening_time <= ?
        AND oh.closing_time >= ?
      `;
      params.push(day_of_week, opening_time, closing_time);
    }
  
    query += `
      GROUP BY 
        te.id
    `;
  
    console.log('Generated SQL query:', query);
    console.log('Parameters:', params);
  
    const [rows] = await pool.query(query, params);
  
    console.log('Fetched rows from database:', rows);
  
    return rows;
  };
  
export default {
    getOperatingHoursById,
    getTouristEntitiesByTime
};