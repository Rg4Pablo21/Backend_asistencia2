// backend/models/grado.model.js
import pool from '../config/db.js';

export const agregarGrado = async (nombre, nivel_id) => {
  const [result] = await pool.query(
    'INSERT INTO grados (nombre, nivel_id) VALUES (?, ?)',
    [nombre, nivel_id]
  );
  return result.insertId;
};

export const eliminarGrado = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM grados WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

// NUEVA FUNCIÓN: Obtener grados asignados a un profesor (por ahora todos)
export const obtenerGradosPorProfesor = async (profesorId) => {
  // Si después agregas una tabla intermedia (profesor_grado), aquí se ajusta
  const [rows] = await pool.query(`
    SELECT g.id, g.nombre, g.nivel_id, n.nombre AS nivel
    FROM grados g
    JOIN niveles n ON g.nivel_id = n.id
    ORDER BY n.nombre, g.nombre
  `);
  return rows;
};
