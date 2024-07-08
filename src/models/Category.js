import pool from '../config/db.js';

const getTouristEntitiesByCategory = async (categoryId) => {
  // Query หลักเพื่อดึงข้อมูลทั่วไปของสถานที่ท่องเที่ยว
  const query = `
    SELECT 
      te.*, 
      c.name AS category_name,
      GROUP_CONCAT(DISTINCT tei.image_path) AS images,
      GROUP_CONCAT(DISTINCT s.name ORDER BY s.date_start) AS seasons
    FROM 
      tourist_entities te
      JOIN categories c ON te.category_id = c.id
      LEFT JOIN tourism_entities_images tei ON te.id = tei.tourism_entities_id
      LEFT JOIN seasons_relation sr ON te.id = sr.tourism_entities_id
      LEFT JOIN seasons s ON sr.season_id = s.id
    WHERE 
      te.category_id = ?
    GROUP BY 
      te.id
  `;

  // Query เพื่อดึงข้อมูลเวลาทำการ
  const hoursQuery = `
    SELECT 
      oh.place_id, 
      oh.day_of_week, 
      oh.opening_time, 
      oh.closing_time 
    FROM 
      operating_hours oh 
    JOIN tourist_entities te ON oh.place_id = te.id
    WHERE 
      te.category_id = ?
  `;

  // รัน Queries ทั้งสอง
  const [rows] = await pool.query(query, [categoryId]);
  const [hoursRows] = await pool.query(hoursQuery, [categoryId]);

  // รวมข้อมูลเวลาทำการกับข้อมูลหลัก
  rows.forEach(row => {
    row.operating_hours = hoursRows.filter(hour => hour.place_id === row.id);
  });

  return rows;
};

export default {
  getTouristEntitiesByCategory,
};