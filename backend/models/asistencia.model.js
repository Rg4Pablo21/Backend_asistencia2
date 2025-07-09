import pool from '../config/db.js';

// Marcar asistencia
export const registrarAsistencia = async (alumno_id, fecha, presente, tarde) => {
    const [result] = await pool.query(
        'INSERT INTO asistencias (alumno_id, fecha, presente, tarde) VALUES (?, ?, ?, ?)',
        [alumno_id, fecha, presente, tarde]
    );
    return result.insertId;
};

// Verificar si ya se tomó asistencia
export const verificarAsistencia = async (alumno_id, fecha) => {
    const [rows] = await pool.query(
        'SELECT * FROM asistencias WHERE alumno_id = ? AND fecha = ?',
        [alumno_id, fecha]
    );
    return rows[0];
};

// Modificar asistencia
export const modificarAsistencia = async (id, presente, tarde) => {
    const [result] = await pool.query(
        'UPDATE asistencias SET presente = ?, tarde = ? WHERE id = ?',
        [presente, tarde, id]
    );
    return result.affectedRows;
};
