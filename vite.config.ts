import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
    // Bu qator atrof-muhit o'zgaruvchilarini yuklaydi
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
        base: './', 
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        
        // Barcha process.env'ga bog'liq "define"larni o'chirib tashladik
        // Chunki Vite ularni o'zi import.meta.env orqali boshqaradi
        
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'), 
            }
        },
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            emptyOutDir: true,
        }
    };
});
