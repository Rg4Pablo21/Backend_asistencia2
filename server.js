// backend/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './config/dotenv.js'; // Ruta corregida

// 🔗 Importar rutas
import correoRoutes from './routes/correo.routes.js';
import authRoutes from './routes/auth.routes.js';
import profesorRoutes from './routes/profesor.routes.js';
import adminRoutes from './routes/admin.routes.js';

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
app.use('/api', correoRoutes); // correos

// 🧪 Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API Asistencia funcionando');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
