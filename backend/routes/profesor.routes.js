import { Router } from 'express';
import { enviarCorreo } from '../controllers/profesor.controller.js';
import {
    obtenerAlumnos,
    agregarAlumno,
    borrarAlumno,
    tomarAsistencia,
    registrarFaltaUniforme
} from '../controllers/profesor.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { isProfesor } from '../middlewares/roles.middleware.js';

const router = Router();

// Protegido: solo profesores autenticados
router.use(verifyToken, isProfesor);

router.get('/alumnos/:grado_id', obtenerAlumnos);
router.post('/alumnos', agregarAlumno);
router.delete('/alumnos/:id', borrarAlumno);

router.post('/asistencia', tomarAsistencia);
router.post('/uniforme', registrarFaltaUniforme);
router.post('/enviar-correo', enviarCorreo);
export default router;
