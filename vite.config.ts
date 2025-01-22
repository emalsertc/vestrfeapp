import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // Add support for TypeScript path aliases and environment variables
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}); 