import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Obtener todos los profesores (rol = 'profesor')
export const getProfesores = async () => {
  const [rows] = await pool.query(
    "SELECT id, nombre, correo FROM usuarios WHERE rol = 'profesor'"
  );
  return rows;
};

// Insertar un nuevo profesor con rol "profesor"
export const insertProfesor = async (nombre, correo, password) => {
  const hashed = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, 'profesor')",
    [nombre, correo, hashed]
  );
};

// Eliminar un profesor
export const deleteProfesor = async (id) => {
  await pool.query("DELETE FROM usuarios WHERE id = ? AND rol = 'profesor'", [id]);
};

// Asignar grado a un profesor
export const asignarGrado = async (profesor_id, grado_id) => {
  await pool.query(
    "INSERT INTO profesores_grados (profesor_id, grado_id) VALUES (?, ?)",
    [profesor_id, grado_id]
  );
};

// Obtener grados asignados a un profesor
export const obtenerGradosPorProfesor = async (profesor_id) => {
  const [rows] = await pool.query(`
    SELECT g.id, g.nombre 
    FROM grados g
    JOIN profesores_grados pg ON pg.grado_id = g.id
    WHERE pg.profesor_id = ?
  `, [profesor_id]);
  return rows;
};
