import pool from '../config/db.js';

// Obtener todos los alumnos de un grado
export const getAlumnosPorGrado = async (grado_id) => {
    const [rows] = await pool.query('SELECT * FROM alumnos WHERE grado_id = ?', [grado_id]);
    return rows;
};

// Agregar un nuevo alumno
export const crearAlumno = async (nombre, correo, grado_id) => {
    const [result] = await pool.query(
        'INSERT INTO alumnos (nombre, correo, grado_id) VALUES (?, ?, ?)',
        [nombre, correo, grado_id]
    );
    return result.insertId;
};

// Eliminar un alumno
export const eliminarAlumno = async (id) => {
    const [result] = await pool.query('DELETE FROM alumnos WHERE id = ?', [id]);
    return result.affectedRows;
};
