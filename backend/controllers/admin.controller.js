import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { obtenerReportesTotales } from '../models/reportes.model.js';

// PROFESORES
export const obtenerProfesores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE rol = "profesor"');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener profesores', error: err.message });
  }
};

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

// NIVELES Y GRADOS
export const obtenerNiveles = async (req, res) => {
  try {
    const [niveles] = await pool.query('SELECT * FROM niveles');
    for (const nivel of niveles) {
      const [grados] = await pool.query('SELECT * FROM grados WHERE nivel_id = ?', [nivel.id]);
      nivel.grados = grados;
    }
    res.status(200).json(niveles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener niveles', error: err.message });
  }
};

export const crearNivel = async (req, res) => {
  try {
    const { nombre } = req.body;
    await pool.query('INSERT INTO niveles (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ message: 'Nivel creado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear nivel', error: err.message });
  }
};

export const eliminarNivel = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM grados WHERE nivel_id = ?', [id]); // Elimina grados primero
    await pool.query('DELETE FROM niveles WHERE id = ?', [id]); // Luego el nivel
    res.status(200).json({ message: 'Nivel y grados eliminados' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar nivel', error: err.message });
  }
};

export const agregarGrado = async (req, res) => {
  try {
    const { nombre, nivel_id } = req.body;
    await pool.query('INSERT INTO grados (nombre, nivel_id) VALUES (?, ?)', [nombre, nivel_id]);
    res.status(201).json({ message: 'Grado agregado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar grado', error: err.message });
  }
};

export const eliminarGrado = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM grados WHERE id = ?', [id]);
    res.status(200).json({ message: 'Grado eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar grado', error: err.message });
  }
};

// REPORTES
export const obtenerReportesGenerales = async (req, res) => {
  try {
    const data = await obtenerReportesTotales();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reportes generales', error: err.message });
  }
};
