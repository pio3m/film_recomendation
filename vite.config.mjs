import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      '3d5ead26-6d64-4c23-9f60-2416f1299b36-00-3f4xw4ciu0t5e.riker.replit.dev',
      'film-recomendation-wy64.onrender.com'
    ],
    proxy: {
      "/api/emotions": {
        target: "https://film-recomendation-api.onrender.com",
        changeOrigin: true,
        rewrite: p => p, // zachowaj /api/emotions
      },
      "/api/recommend": {
        target: "https://apifilm.tojest.dev",
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/api\/recommend/, "/recommend-by-sentence"),
      },
      '/api': {
        target: "https://film-recomendation-api.onrender.com",
        changeOrigin: true,
      }
    }    
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './components'),
    },
  }
});
