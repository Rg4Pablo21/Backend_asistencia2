import { Router } from 'express';
import {
  obtenerAlumnos,
  agregarAlumno,
  borrarAlumno,
  tomarAsistencia,
  registrarFaltaUniforme,
  enviarCorreo,
  obtenerGradosAsignados
} from '../controllers/profesor.controller.js';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { isProfesor } from '../middlewares/roles.middleware.js';

const router = Router();

// 🛡️ Middleware global: solo profesores autenticados
router.use(verifyToken, isProfesor);

// 📘 Rutas disponibles para los profesores
router.get('/grados', obtenerGradosAsignados);
router.get('/alumnos/:grado_id', obtenerAlumnos);
router.post('/alumnos', agregarAlumno);
router.delete('/alumnos/:id', borrarAlumno);  // 🔐 incluye confirmación de contraseña
router.post('/asistencia', tomarAsistencia);
router.post('/uniforme', registrarFaltaUniforme);
router.post('/enviar-correo', enviarCorreo);

export default router;
