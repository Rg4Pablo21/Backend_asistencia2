import pool from '../config/db.js';

// Ver todos los profesores
export const obtenerProfesores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE rol = "profesor"');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener profesores', error: err.message });
    }
};

// Agregar un profesor
export const agregarProfesor = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, "profesor")',
            [nombre, correo, hashedPassword]
        );
        res.status(201).json({ message: 'Profesor agregado' });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar profesor', error: err.message });
    }
};

// Eliminar un profesor
export const eliminarProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ? AND rol = "profesor"', [id]);
        if (result.affectedRows) {
            res.status(200).json({ message: 'Profesor eliminado' });
        } else {
            res.status(404).json({ message: 'Profesor no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar profesor', error: err.message });
    }
};
