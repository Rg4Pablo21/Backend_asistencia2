// backend/models/correo.model.js
import pool from '../config/db.js';

export const guardarCorreo = async ({ destino, asunto, mensaje, enviado_por }) => {
  const sql = `
    INSERT INTO correos (destino, asunto, mensaje, enviado_por)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [destino, asunto, mensaje, enviado_por]);
  return result.insertId;
};

export const obtenerCorreos = async () => {
  const [rows] = await pool.query(`
    SELECT c.*, u.nombre AS nombre_emisor 
    FROM correos c
    JOIN usuarios u ON c.enviado_por = u.id
    ORDER BY c.enviado_en DESC
  `);
  return rows;
};
