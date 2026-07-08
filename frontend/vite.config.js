import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/',
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
    server: {
        host: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true
            }
        }
    }
})
