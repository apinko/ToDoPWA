import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copy } from 'vite-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",  
        chunkFileNames: "[name].js", 
        assetFileNames: "[name].[ext]", 
      },
    },
  },
})