import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// 🔥 Asegurar que FRONTEND_URL está definido
const FRONTEND_URL = process.env.FRONTEND_URL || "https://weather-challenge-qfmv.onrender.com";
console.log(`🔧 Configurando CORS para: ${FRONTEND_URL}`);
// 🔥 Configuración correcta de CORS
const corsOptions = {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🔥 Permitir preflight requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 📡 Ruta de prueba para ver si el backend responde
app.get("/api/test", (_req, res) => {
    res.json({ message: "✅ Backend funcionando correctamente 🚀" });
});
// 📡 Rutas de la API
import weatherRoutes from './routes/api/weatherRoutes.js';
app.use('/api/weather', weatherRoutes);
// 🖥️ Servir el frontend estático
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, '../../client/dist')));
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});
// 🚀 Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
