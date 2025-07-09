// controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const generarToken = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const usuario = rows[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = generarToken(usuario.id, usuario.rol);
        res.json({ token, rol: usuario.rol });
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
};

export const register = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, hashedPassword, rol]
        );
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
    }
};

export const forgotPassword = async (req, res) => {
    const { correo } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (rows.length === 0) return res.status(404).json({ message: 'Correo no encontrado' });

        // Aquí deberías integrar con un sistema de envío de correo
        res.json({ message: 'Enlace de recuperación enviado (simulado)' });
    } catch (err) {
        res.status(500).json({ message: 'Error al enviar enlace', error: err.message });
    }
};
