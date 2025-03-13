import path from "path";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas API
import weatherRoutes from "./routes/api/weatherRoutes.js";
app.use("/api/weather", weatherRoutes);

// 📌 Servir el frontend si existe
const frontendPath = path.join(process.cwd(), "../client/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
