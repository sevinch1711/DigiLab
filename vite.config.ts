import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
        // 1. MUHIM: Vercel'da oq ekran chiqmasligi uchun nisbiy yo'l
        base: './', 
        
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        
        plugins: [react()],
        
        // 2. API kalitlarini xavfsiz uzatish
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        
        resolve: {
            alias: {
                // 3. Alias'ni zamonaviy usulda sozlash
                '@': resolve(__dirname, './src'), 
            }
        },

        // 4. Build sozlamalari (Vercel uchun)
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            emptyOutDir: true,
        }
    };
});
