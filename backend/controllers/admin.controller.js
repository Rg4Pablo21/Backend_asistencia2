// backend/controllers/admin.controller.js
import {
  crearNivelDB,
  obtenerNivelesConGrados,
  eliminarNivelYGrados,
  crearGradoDB,
  eliminarGradoDB
} from '../models/nivel.model.js';

export const obtenerNiveles = async (req, res) => {
  try {
    const niveles = await obtenerNivelesConGrados();
    res.json(niveles);
  } catch (error) {
    console.error('Error al obtener niveles:', error);
    res.status(500).json({ message: 'Error al obtener niveles' });
  }
};

export const crearNivel = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Falta el nombre del nivel' });

    const id = await crearNivelDB(nombre);
    res.status(201).json({ id, nombre });
  } catch (error) {
    console.error('Error al crear nivel:', error);
    res.status(500).json({ message: 'Error al crear nivel' });
  }
};

export const eliminarNivel = async (req, res) => {
  try {
    const id = req.params.id;
    await eliminarNivelYGrados(id);
    res.json({ message: 'Nivel y sus grados eliminados' });
  } catch (error) {
    console.error('Error al eliminar nivel:', error);
    res.status(500).json({ message: 'Error al eliminar nivel' });
  }
};

export const agregarGrado = async (req, res) => {
  try {
    const { nombre, nivel_id } = req.body;
    if (!nombre || !nivel_id) return res.status(400).json({ message: 'Faltan datos' });

    const id = await crearGradoDB(nombre, nivel_id);
    res.status(201).json({ id, nombre });
  } catch (error) {
    console.error('Error al agregar grado:', error);
    res.status(500).json({ message: 'Error al agregar grado' });
  }
};

export const eliminarGrado = async (req, res) => {
  try {
    const id = req.params.id;
    await eliminarGradoDB(id);
    res.json({ message: 'Grado eliminado' });
  } catch (error) {
    console.error('Error al eliminar grado:', error);
    res.status(500).json({ message: 'Error al eliminar grado' });
  }
};
