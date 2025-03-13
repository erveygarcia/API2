import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // 🔥 Esto hace que los archivos se sirvan con rutas relativas
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // Guarda los archivos en `dist/`
    emptyOutDir: true, // Borra el contenido anterior de `dist/`
  },
  define: {
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL || 'http://localhost:3001')
  }
});
