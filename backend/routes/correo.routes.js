// backend/routes/correo.routes.js
import { Router } from 'express';
import { registrarCorreo } from '../controllers/correo.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// ✅ Ruta protegida con middleware correcto
router.post('/enviar-correo', verifyToken, registrarCorreo);

export default router;
