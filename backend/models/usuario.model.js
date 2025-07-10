import pool from '../config/db.js';

// 🔍 Buscar usuario por ID (para validaciones como eliminar alumno)
export async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0] || null;
}
