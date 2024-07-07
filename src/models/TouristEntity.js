import pool from '../config/db.js';


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


const getTouristEntitiesBySeason = async (seasonId) => {
  const query = `
    SELECT 
        te.*, 
        s.name AS season_name, 
        ti.image_path,
        d.name AS district_name,
        CONCAT(
            GROUP_CONCAT(
                DISTINCT CONCAT(
                    oh.day_of_week, ': ', 
                    TIME_FORMAT(oh.opening_time, '%h:%i %p'), ' - ', 
                    TIME_FORMAT(oh.closing_time, '%h:%i %p')
                ) ORDER BY oh.day_of_week SEPARATOR '\n'
            )
        ) AS operating_hours
    FROM 
        tourist_entities te
        JOIN seasons_relation sr ON te.id = sr.tourism_entities_id
        JOIN seasons s ON sr.season_id = s.id
        LEFT JOIN tourism_entities_images ti ON te.id = ti.tourism_entities_id
        LEFT JOIN operating_hours oh ON te.id = oh.place_id
        JOIN district d ON te.district_id = d.id
    WHERE 
        sr.season_id = ?
    GROUP BY 
        te.id
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

// ฟังก์ชันสำหรับดึงข้อมูล Tourist Entities ตามช่วงเวลาทำการ
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
          ) AS operating_hours
      FROM
          tourist_entities te
          JOIN district d ON te.district_id = d.id
          LEFT JOIN operating_hours oh ON te.id = oh.place_id
      WHERE
          1 = 1
  `;

  // เพิ่มเงื่อนไขการค้นหาเวลาทำการ
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

  // Log the generated SQL query and parameters
  console.log('Generated SQL query:', query);
  console.log('Parameters:', params);

  // ส่ง query ไปยังฐานข้อมูล MySQL พร้อมกับพารามิเตอร์ที่ระบุ
  const [rows] = await pool.query(query, params);

  // Log the fetched rows
  console.log('Fetched rows from database:', rows);

  return rows;
};

export default {
  getAllTouristEntities,
  getTouristEntityById,
  getTouristEntitiesByCategory,
  getTouristEntitiesByDistrict,
  getTouristEntitiesBySeason,
  getNearbyTouristEntities,
  getTouristEntityDetailsById,
  getOperatingHoursById,
  getTouristEntitiesByTime
};