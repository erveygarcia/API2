import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRoutes from './routes/api/weatherRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Fix '__dirname is not defined' issue for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar las rutas de API
app.use('/api/weather', weatherRoutes);

// 🚀 SERVIR EL FRONTEND DESDE EL LUGAR CORRECTO
const clientDistPath = path.join(__dirname, '../client/dist'); // Ajusta la ruta
app.use(express.static(clientDistPath));

// 🚀 Manejar cualquier otra ruta y servir `index.html`
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🌍 Server running at http://localhost:${PORT}`);
});
