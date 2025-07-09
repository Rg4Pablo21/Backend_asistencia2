import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './config/dotenv.js';
import authRoutes from './routes/auth.routes.js';
import profesorRoutes from './routes/profesor.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
    origin: '*', // O especifica tu frontend: 'http://127.0.0.1:5500'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/profesor', profesorRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('API Asistencia funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
