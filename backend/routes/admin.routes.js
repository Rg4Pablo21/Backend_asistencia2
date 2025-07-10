import { Router } from 'express';
import {
  obtenerNiveles,
  crearNivel,
  eliminarNivel,
  agregarGrado,
  eliminarGrado,
  obtenerProfesores,
  crearProfesor,
  eliminarProfesor,
  asignarGradoAProfesor
} from '../controllers/admin.controller.js';

import {
  verifyToken,
  verificarAdmin
} from '../middlewares/auth.middleware.js';

const router = Router();

// Middleware: solo administradores
router.use(verifyToken, verificarAdmin);

// Niveles y grados
router.get('/niveles', obtenerNiveles);
router.post('/niveles', crearNivel);
router.delete('/niveles/:id', eliminarNivel);

router.post('/grados', agregarGrado);
router.delete('/grados/:id', eliminarGrado);

// Profesores
router.get('/profesores', obtenerProfesores);
router.post('/profesores', crearProfesor);
router.delete('/profesores/:id', eliminarProfesor);

// Asignación de grados
router.post('/asignar-grado', asignarGradoAProfesor);

export default router;
