import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
dotenv.config();

import weatherRoutes from './routes/api/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Manejo de rutas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/weather', weatherRoutes);

// Servir archivos estáticos del frontend (asegúrate de que exista en la carpeta correcta)
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🌍 Server running on port ${PORT}`);
});
