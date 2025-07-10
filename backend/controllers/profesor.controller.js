import {
  getAlumnosPorGrado,
  crearAlumno,
  eliminarAlumno
} from '../models/alumno.model.js';

import {
  registrarAsistencia,
  verificarAsistencia,
  modificarAsistencia
} from '../models/asistencia.model.js';

import { registrarUniforme } from '../models/uniforme.model.js';
import { guardarCorreo } from '../models/correo.model.js';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import { findUserById } from '../models/usuario.model.js';

// 🔹 Obtener grados asignados al profesor
export const obtenerGradosAsignados = async (req, res) => {
  try {
    const profesor_id = req.userId;
    const [grados] = await pool.query(`
      SELECT g.id, g.nombre 
      FROM grados g
      JOIN profesores_grados pg ON pg.grado_id = g.id
      WHERE pg.profesor_id = ?
    `, [profesor_id]);

    res.json(grados);
  } catch (err) {
    console.error('❌ Error al obtener grados asignados:', err);
    res.status(500).json({ message: 'Error al obtener grados' });
  }
};

// 🔹 Obtener alumnos por grado
export const obtenerAlumnos = async (req, res) => {
  try {
    const grado_id = req.params.grado_id;
    const alumnos = await getAlumnosPorGrado(grado_id);
    res.json(alumnos);
  } catch (err) {
    console.error('❌ Error al obtener alumnos:', err);
    res.status(500).json({ message: 'Error al obtener alumnos' });
  }
};

// 🔹 Agregar alumno
export const agregarAlumno = async (req, res) => {
  try {
    const { nombre, correo, grado_id } = req.body;
    if (!nombre || !correo || !grado_id) {
      return res.status(400).json({ message: 'Faltan datos' });
    }
    const id = await crearAlumno(nombre, correo, grado_id);
    res.status(201).json({ message: 'Alumno creado', id });
  } catch (err) {
    console.error('❌ Error al agregar alumno:', err);
    res.status(500).json({ message: 'Error al agregar alumno' });
  }
};

// 🔹 Eliminar alumno con verificación de contraseña del profesor
export const borrarAlumno = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Contraseña requerida' });
    }

    const profesor = await findUserById(req.userId);
    if (!profesor) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, profesor.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const deleted = await eliminarAlumno(id);
    if (!deleted) return res.status(404).json({ message: 'Alumno no encontrado' });

    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar alumno:', err);
    res.status(500).json({ message: 'Error al eliminar alumno' });
  }
};

// 🔹 Tomar asistencia
export const tomarAsistencia = async (req, res) => {
  try {
    const { fecha, asistencia } = req.body;
    for (const alumno_id in asistencia) {
      const { presente, tarde } = asistencia[alumno_id];
      const existente = await verificarAsistencia(alumno_id, fecha);
      if (existente) {
        await modificarAsistencia(existente.id, presente, tarde || false);
      } else {
        await registrarAsistencia(alumno_id, fecha, presente, tarde || false);
      }
    }
    res.json({ message: '✅ Asistencia guardada correctamente' });
  } catch (err) {
    console.error('❌ Error al tomar asistencia:', err);
    res.status(500).json({ message: 'Error al tomar asistencia' });
  }
};

// 🔹 Registrar uniforme
export const registrarFaltaUniforme = async (req, res) => {
  try {
    const { alumno_id, fecha, uniforme } = req.body;
    if (!alumno_id || !fecha || !uniforme) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }
    const id = await registrarUniforme(alumno_id, fecha, uniforme);
    res.status(201).json({ message: '✅ Uniforme registrado', id });
  } catch (err) {
    console.error('❌ Error al registrar uniforme:', err);
    res.status(500).json({ message: 'Error al registrar uniforme' });
  }
};

// 🔹 Enviar correo
export const enviarCorreo = async (req, res) => {
  try {
    const { destino, asunto, mensaje } = req.body;
    const enviado_por = req.userId;

    if (!destino || !asunto || !mensaje) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    await guardarCorreo({ destino, asunto, mensaje, enviado_por });
    res.status(201).json({ message: '📨 Correo enviado correctamente' });
  } catch (err) {
    console.error('❌ Error al enviar correo:', err);
    res.status(500).json({ message: 'Error al enviar correo', error: err.message });
  }
};
