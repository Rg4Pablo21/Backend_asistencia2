import {
  getNivelesConGrados,
  insertNivel,
  deleteNivel,
  insertGrado,
  deleteGrado
} from '../models/nivel.model.js';

import {
  getProfesores,
  insertProfesor,
  deleteProfesor,
  asignarGrado
} from '../models/profesor.model.js';

export const obtenerNiveles = async (req, res) => {
  try {
    const niveles = await getNivelesConGrados();
    res.json(niveles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener niveles' });
  }
};

export const crearNivel = async (req, res) => {
  try {
    const { nombre } = req.body;
    await insertNivel(nombre);
    res.status(201).json({ message: 'Nivel creado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear nivel' });
  }
};

export const eliminarNivel = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteNivel(id);
    res.json({ message: 'Nivel eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar nivel' });
  }
};

export const agregarGrado = async (req, res) => {
  try {
    const { nombre, nivel_id } = req.body;
    await insertGrado(nombre, nivel_id);
    res.status(201).json({ message: 'Grado agregado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar grado' });
  }
};

export const eliminarGrado = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteGrado(id);
    res.json({ message: 'Grado eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar grado' });
  }
};

export const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await getProfesores();
    res.json(profesores);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener profesores' });
  }
};

export const crearProfesor = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    await insertProfesor(nombre, correo, password);
    res.status(201).json({ message: 'Profesor creado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear profesor' });
  }
};

export const eliminarProfesor = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProfesor(id);
    res.json({ message: 'Profesor eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar profesor' });
  }
};

export const asignarGradoAProfesor = async (req, res) => {
  try {
    const { profesor_id, grado_id } = req.body;
    await asignarGrado(profesor_id, grado_id);
    res.status(201).json({ message: 'Grado asignado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar grado' });
  }
};
