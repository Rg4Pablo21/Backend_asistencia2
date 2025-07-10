// backend/routes/profesor.routes.js
import { Router } from 'express';
import {
  obtenerAlumnos,
  agregarAlumno,
  borrarAlumno,
  tomarAsistencia,
  registrarFaltaUniforme,
  enviarCorreo,
  obtenerGradosAsignados // 👈 asegúrate de importar esta nueva función
} from '../controllers/profesor.controller.js';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { isProfesor } from '../middlewares/roles.middleware.js';

const router = Router();

// Middleware global
router.use(verifyToken, isProfesor);

router.get('/grados', obtenerGradosAsignados); // 👈 Nueva ruta
router.get('/alumnos/:grado_id', obtenerAlumnos);
router.post('/alumnos', agregarAlumno);
router.delete('/alumnos/:id', borrarAlumno);
router.post('/asistencia', tomarAsistencia);
router.post('/uniforme', registrarFaltaUniforme);
router.post('/enviar-correo', enviarCorreo);

export default router;
