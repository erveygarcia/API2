import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Importar rutas de la API
import weatherRoutes from './routes/api/weatherRoutes.js';

const app = express();
const PORT = process.env.PORT || 10000;

// Corregir '__dirname' en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/weather', weatherRoutes);

// Servir frontend desde 'client/dist'
const frontendPath = path.join(process.cwd(), '../client/dist');
app.use(express.static(frontendPath));

// Evitar que las rutas de la API devuelvan `index.html`
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "API route not found" });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

