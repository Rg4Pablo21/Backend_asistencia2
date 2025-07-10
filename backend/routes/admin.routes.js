// backend/routes/admin.routes.js
import { Router } from 'express';
import {
  obtenerNiveles,
  crearNivel,
  eliminarNivel,
  agregarGrado,
  eliminarGrado
} from '../controllers/admin.controller.js';
import { verifyToken, verificarAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Middleware: solo administradores
router.use(verifyToken, verificarAdmin);

// Niveles
router.get('/niveles', obtenerNiveles);
router.post('/niveles', crearNivel);
router.delete('/niveles/:id', eliminarNivel);

// Grados
router.post('/grados', agregarGrado);
router.delete('/grados/:id', eliminarGrado);

export default router;
