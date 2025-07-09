// backend/controllers/correo.controller.js
import pool from '../config/db.js';

export const registrarCorreo = async (req, res) => {
    try {
        const { destino, asunto, mensaje } = req.body;
        const enviado_por = req.userId; // ← viene del token decodificado

        if (!destino || !asunto || !mensaje) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        await pool.query(
            'INSERT INTO correos (destino, asunto, mensaje, enviado_por) VALUES (?, ?, ?, ?)',
            [destino, asunto, mensaje, enviado_por]
        );

        res.status(201).json({ message: 'Correo guardado correctamente' });
    } catch (err) {
        console.error('❌ Error al guardar correo:', err);
        res.status(500).json({ message: 'Error al guardar correo', error: err.message });
    }
};
