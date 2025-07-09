import { Router } from 'express';
import { obtenerReportesGenerales } from '../controllers/admin.controller.js';
import {
    obtenerProfesores,
    agregarProfesor,
    eliminarProfesor
} from '../controllers/admin.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/roles.middleware.js';

const router = Router();

// Protegido: solo administradores autenticados
router.use(verifyToken, isAdmin);

router.get('/profesores', obtenerProfesores);
router.post('/profesores', agregarProfesor);
router.delete('/profesores/:id', eliminarProfesor);
router.get('/reportes', obtenerReportesGenerales);
export default router;
