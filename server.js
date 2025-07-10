// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Cargar variables de entorno

// ✅ Rutas correctamente referenciadas desde backend/
import correoRoutes from './backend/routes/correo.routes.js';
import authRoutes from './backend/routes/auth.routes.js';
import profesorRoutes from './backend/routes/profesor.routes.js';
import adminRoutes from './backend/routes/admin.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// 🛡️ Middleware de seguridad CORS
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://backend-asistencia2-2.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🧠 Middleware para leer JSON
app.use(express.json({ limit: '5mb' }));

// 📜 Middleware para logs HTTP
app.use(morgan('dev'));

// 🔗 Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/profesor', profesorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', correoRoutes);

// 🧪 Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API Asistencia funcionando');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
