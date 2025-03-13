import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 🔥 Habilitar CORS correctamente
app.use(cors({
    origin: "*", // 🔥 Permitir solicitudes desde cualquier origen
    methods: "GET,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
import weatherRoutes from './routes/api/weatherRoutes.js';
app.use('/api/weather', weatherRoutes);

// Servir frontend estático
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../../client/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
