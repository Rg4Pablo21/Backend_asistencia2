import pool from '../config/db.js';

export async function getNivelesConGrados() {
  const [niveles] = await pool.query('SELECT * FROM niveles');
  for (const nivel of niveles) {
    const [grados] = await pool.query('SELECT * FROM grados WHERE nivel_id = ?', [nivel.id]);
    nivel.grados = grados;
  }
  return niveles;
}

export async function insertNivel(nombre) {
  const [result] = await pool.query('INSERT INTO niveles (nombre) VALUES (?)', [nombre]);
  return result.insertId;
}

export async function deleteNivel(id) {
  const [result] = await pool.query('DELETE FROM niveles WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

export async function insertGrado(nombre, nivel_id) {
  const [result] = await pool.query('INSERT INTO grados (nombre, nivel_id) VALUES (?, ?)', [nombre, nivel_id]);
  return result.insertId;
}

export async function deleteGrado(id) {
  const [result] = await pool.query('DELETE FROM grados WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
