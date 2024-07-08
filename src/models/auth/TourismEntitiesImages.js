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

const create = async (image) => {
  const query = 'INSERT INTO tourism_entities_images SET ?';
  const [result] = await pool.query(query, image);
  return result.insertId;
};

const update = async (id, image) => {
  const query = 'UPDATE tourism_entities_images SET ? WHERE id = ?';
  const [result] = await pool.query(query, [image, id]);
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