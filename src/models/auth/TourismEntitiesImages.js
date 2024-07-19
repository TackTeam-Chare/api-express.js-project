import pool from '../../config/db.js';

const getAllImages = async () => {
  const query = 'SELECT * FROM tourism_entities_images';
  const [rows] = await pool.query(query);
  console.log('Query All Images:', rows);
  return rows;
};

const getImageById = async (id) => {
  const query = 'SELECT * FROM tourism_entities_images WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  console.log(`Query Image by ID ${id}:`, rows);
  return rows[0];
};

const create = async (images) => {
  const insertIds = [];
  for (const image of images) {
      const query = 'INSERT INTO tourism_entities_images SET ?';
      const [result] = await pool.query(query, image);
      insertIds.push(result.insertId);
      console.log('Insert Image:', image, 'Insert ID:', result.insertId);
  }
  return insertIds;
};

const update = async (id, imagePaths) => {
  const deleteQuery = 'DELETE FROM tourism_entities_images WHERE tourism_entities_id = ?';
  await pool.query(deleteQuery, [id]);
  console.log(`Deleted Images for Entity ID ${id}`);

  const insertQuery = 'INSERT INTO tourism_entities_images (tourism_entities_id, image_path, created_at) VALUES ?';
  const values = imagePaths.map(imagePath => [id, imagePath, new Date()]);
  const [result] = await pool.query(insertQuery, [values]);
  console.log('Inserted Images:', values, 'Affected Rows:', result.affectedRows);
  return result.affectedRows;
};

const remove = async (id) => {
  const query = 'DELETE FROM tourism_entities_images WHERE id = ?';
  const [result] = await pool.query(query, [id]);
  console.log(`Deleted Image by ID ${id}:`, result.affectedRows);
  return result.affectedRows;
};

export default {
  getAllImages,
  getImageById,
  create,
  update,
  remove,
};
