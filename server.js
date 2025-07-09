// backend/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './backend/config/dotenv.js';
import correoRoutes from './backend/routes/correo.routes.js'; 

import authRoutes from './backend/routes/auth.routes.js';
import profesorRoutes from './backend/routes/profesor.routes.js';
import adminRoutes from './backend/routes/admin.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// 🛡️ Middleware de seguridad CORS (ajustado al frontend local)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🧠 Middleware para leer JSON
app.use(express.json({ limit: '5mb' }));

// 📜 Logs de peticiones HTTP
app.use(morgan('dev'));

// 🔗 Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/profesor', profesorRoutes);
app.use('/api/admin', adminRoutes);


// Ruta de correo 
app.use('/api', correoRoutes);



// 🧪 Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API Asistencia funcionando');
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
