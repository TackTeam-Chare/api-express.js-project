import pool from '../../config/db.js';

// Get all seasons
const getAllSeasons = async () => {
    const query = 'SELECT * FROM seasons';
    const [rows] = await pool.query(query);
    return rows;
};

const getSeasonById = async (id) => {
    const query = 'SELECT * FROM seasons WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0];
};

const create = async (season) => {
    const query = 'INSERT INTO seasons SET ?';
    const [result] = await pool.query(query, season);
    return result.insertId;
};

const update = async (id, season) => {
    const query = 'UPDATE seasons SET ? WHERE id = ?';
    const [result] = await pool.query(query, [season, id]);
    return result.affectedRows;
};

const remove = async (id) => {
    const query = 'DELETE FROM seasons WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result.affectedRows;
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



export default {
    getAllSeasons,
    getSeasonById,
    create,
    update,
    remove,
    getTouristEntitiesBySeason,
  
};