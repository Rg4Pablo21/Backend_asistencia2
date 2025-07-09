import { getAlumnosPorGrado, crearAlumno, eliminarAlumno } from '../models/alumno.model.js';
import { registrarAsistencia, verificarAsistencia, modificarAsistencia } from '../models/asistencia.model.js';
import { registrarUniforme } from '../models/uniforme.model.js';
import { guardarCorreo } from '../models/correo.model.js';

// Ver alumnos de un grado
export const obtenerAlumnos = async (req, res) => {
    try {
        const { grado_id } = req.params;
        const alumnos = await getAlumnosPorGrado(grado_id);
        res.status(200).json(alumnos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener alumnos', error: err.message });
    }
};

// Agregar alumno
export const agregarAlumno = async (req, res) => {
    try {
        const { nombre, correo, grado_id } = req.body;
        const alumnoId = await crearAlumno(nombre, correo, grado_id);
        res.status(201).json({ message: 'Alumno agregado', alumnoId });
    } catch (err) {
        res.status(500).json({ message: 'Error al agregar alumno', error: err.message });
    }
};

// Eliminar alumno
export const borrarAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await eliminarAlumno(id);
        if (deleted) {
            res.status(200).json({ message: 'Alumno eliminado' });
        } else {
            res.status(404).json({ message: 'Alumno no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar alumno', error: err.message });
    }
};

// Registrar asistencia
export const tomarAsistencia = async (req, res) => {
    try {
        const { alumno_id, fecha, presente, tarde } = req.body;

        const yaRegistrado = await verificarAsistencia(alumno_id, fecha);
        if (yaRegistrado) {
            await modificarAsistencia(yaRegistrado.id, presente, tarde);
            res.status(200).json({ message: 'Asistencia actualizada' });
        } else {
            await registrarAsistencia(alumno_id, fecha, presente, tarde);
            res.status(201).json({ message: 'Asistencia registrada' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al tomar asistencia', error: err.message });
    }
};

// Registrar faltas de uniforme
export const registrarFaltaUniforme = async (req, res) => {
    try {
        const { alumno_id, fecha, uniforme } = req.body;
        await registrarUniforme(alumno_id, fecha, uniforme);
        res.status(201).json({ message: 'Falta de uniforme registrada' });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar uniforme', error: err.message });
    }
};

// Enviar correo
export const enviarCorreo = async (req, res) => {
    try {
        const { destino, asunto, mensaje } = req.body;

        if (!destino || !asunto || !mensaje) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Simular envío real
        console.log('📧 Enviando correo a:', destino);
        console.log('Asunto:', asunto);
        console.log('Mensaje:', mensaje);

        // Guardar en historial de correos
        await guardarCorreo(destino, asunto, mensaje, req.user.id);

        res.status(200).json({ message: 'Correo enviado correctamente (simulado)' });
    } catch (err) {
        res.status(500).json({ message: 'Error al enviar correo', error: err.message });
    }
};
