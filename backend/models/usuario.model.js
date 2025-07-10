import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

// 🔑 Generar token con JWT
const generarToken = (id, rol) => {
    return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// 🔐 Login de usuario
export const login = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ message: 'Correo y contraseña requeridos' });
    }

    try {
        console.log('🔑 Intentando login con:', correo);
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (rows.length === 0) {
            console.warn('⚠️ Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = rows[0];
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            console.warn('⚠️ Contraseña incorrecta');
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = generarToken(usuario.id, usuario.rol);
        console.log('✅ Login exitoso:', correo);
        res.json({ token, rol: usuario.rol });
    } catch (err) {
        console.error('❌ Error en login:', err);
        res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
};

// 🧾 Registro de usuario
export const register = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password || !rol) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para registrar' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, hashedPassword, rol]
        );

        console.log('✅ Usuario registrado:', correo);
        res.status(201).json({ message: 'Usuario registrado correctamente', rol });
    } catch (err) {
        console.error('❌ Error al registrar usuario:', err);
        res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
    }
};

// 🔁 Simulación de recuperación de contraseña
export const forgotPassword = async (req, res) => {
    const { correo } = req.body;

    if (!correo) {
        return res.status(400).json({ message: 'Correo requerido' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (rows.length === 0) {
            console.warn('⚠️ Correo no encontrado:', correo);
            return res.status(404).json({ message: 'Correo no encontrado' });
        }

        // Aquí podrías enviar un correo real con un token o enlace si se conecta SMTP
        console.log('📨 Enlace de recuperación simulado enviado a:', correo);
        res.json({ message: 'Enlace de recuperación enviado (simulado)' });
    } catch (err) {
        console.error('❌ Error al procesar recuperación:', err);
        res.status(500).json({ message: 'Error al enviar enlace', error: err.message });
    }
};
