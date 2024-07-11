import pool from '../../config/db.js';

const getAllSeasonsRelations = async () => {
  const query = 'SELECT * FROM seasons_relation ';
  const [rows] = await pool.query(query);
  return rows;
};

const getSeasonsRelationById = async (id) => {
  const query = 'SELECT * FROM seasons_relation WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};

const create = async (relation) => {
  const query = 'INSERT INTO seasons_relation SET ?';
  const [result] = await pool.query(query, relation);
  return result.insertId;
};

const update = async (id, relation) => {
  const query = 'UPDATE seasons_relation SET ? WHERE id = ?';
  const [result] = await pool.query(query, [relation, id]);
  return result.affectedRows;
};

const remove = async (id) => {
  const query = 'DELETE FROM seasons_relation WHERE id = ?';
  const [result] = await pool.query(query, [id]);
  return result.affectedRows;
};




export default {
  getAllSeasonsRelations,
  getSeasonsRelationById,
  create,
  update,
  remove,
};
