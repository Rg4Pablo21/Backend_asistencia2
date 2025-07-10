// backend/models/nivel.model.js
import pool from '../config/db.js';

export const crearNivelDB = async (nombre) => {
  const [result] = await pool.query('INSERT INTO niveles (nombre) VALUES (?)', [nombre]);
  return result.insertId;
};

export const obtenerNivelesConGrados = async () => {
  const [niveles] = await pool.query('SELECT * FROM niveles');
  for (const nivel of niveles) {
    const [grados] = await pool.query('SELECT * FROM grados WHERE nivel_id = ?', [nivel.id]);
    nivel.grados = grados;
  }
  return niveles;
};

export const eliminarNivelYGrados = async (nivelId) => {
  await pool.query('DELETE FROM grados WHERE nivel_id = ?', [nivelId]);
  const [result] = await pool.query('DELETE FROM niveles WHERE id = ?', [nivelId]);
  return result.affectedRows;
};

export const crearGradoDB = async (nombre, nivel_id) => {
  const [result] = await pool.query(
    'INSERT INTO grados (nombre, nivel_id) VALUES (?, ?)',
    [nombre, nivel_id]
  );
  return result.insertId;
};

export const eliminarGradoDB = async (id) => {
  const [result] = await pool.query('DELETE FROM grados WHERE id = ?', [id]);
  return result.affectedRows;
};
