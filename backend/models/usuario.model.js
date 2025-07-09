import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
    return rows[0];
};

export const createUser = async (nombre, correo, hashedPassword, rol) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, correo, hashedPassword, rol]
    );
    return result.insertId;
};
