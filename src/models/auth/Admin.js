import pool from '../../config/db.js';

const getAllAdmins = async () => {
  const query = 'SELECT * FROM admin';
  const [rows] = await pool.query(query);
  return rows;
};

const getAdminById = async (id) => {
  const query = 'SELECT * FROM admin WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};

const create = async (admin) => {
  const query = 'INSERT INTO admin SET ?';
  const [result] = await pool.query(query, admin);
  return result.insertId;
};

const update = async (id, admin) => {
  const query = 'UPDATE admin SET ? WHERE id = ?';
  const [result] = await pool.query(query, [admin, id]);
  return result.affectedRows;
};

const remove = async (id) => {
  const query = 'DELETE FROM admin WHERE id = ?';
  const [result] = await pool.query(query, [id]);
  return result.affectedRows;
};

export default {
  getAllAdmins,
  getAdminById,
  create,
  update,
  remove,
};
