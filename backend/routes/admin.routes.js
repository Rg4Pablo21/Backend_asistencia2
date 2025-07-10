import { Router } from 'express';
import {
  obtenerProfesores,
  agregarProfesor,
  eliminarProfesor,
  obtenerNiveles,
  crearNivel,
  eliminarNivel,
  agregarGrado,
  eliminarGrado,
  obtenerReportesGenerales
} from '../controllers/admin.controller.js';

import { verifyToken } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/roles.middleware.js';

const router = Router();

// Middleware global: solo admins autenticados
router.use(verifyToken, isAdmin);

// Profesores
router.get('/profesores', obtenerProfesores);
router.post('/profesores', agregarProfesor);
router.delete('/profesores/:id', eliminarProfesor);

// Niveles y Grados
router.get('/niveles', obtenerNiveles);
router.post('/niveles', crearNivel);
router.delete('/niveles/:id', eliminarNivel);

router.post('/grados', agregarGrado);
router.delete('/grados/:id', eliminarGrado);

// Reportes
router.get('/reportes', obtenerReportesGenerales);

export default router;
