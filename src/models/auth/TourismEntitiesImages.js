import pool from '../../config/db.js';

const getAllImages = async () => {
  const query = 'SELECT * FROM tourism_entities_images';
  const [rows] = await pool.query(query);
  return rows;
};

const getImageById = async (id) => {
  const query = 'SELECT * FROM tourism_entities_images WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};

const create = async (images) => {
  const insertIds = [];
  for (const image of images) {
      const query = 'INSERT INTO tourism_entity_images SET ?';
      const [result] = await pool.query(query, image);
      insertIds.push(result.insertId);
  }
  return insertIds;
};

const update = async (id, imagePaths) => {
  const deleteQuery = 'DELETE FROM tourism_entities_images WHERE tourism_entities_id = ?';
  await pool.query(deleteQuery, [id]);

  const insertQuery = 'INSERT INTO tourism_entities_images (tourism_entities_id, image_path) VALUES ?';
  const values = imagePaths.map(imagePath => [id, imagePath]);

  const [result] = await pool.query(insertQuery, [values]);
  return result.affectedRows;
};
const remove = async (id) => {
  const query = 'DELETE FROM tourism_entities_images WHERE id = ?';
  const [result] = await pool.query(query, [id]);
  return result.affectedRows;
};

export default {
  getAllImages,
  getImageById,
  create,
  update,
  remove,
};