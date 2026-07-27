import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/monoedge/',
  plugins: [react()],

  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'landing.html'),
        scheduling: resolve(__dirname, 'scheduling.html'),
        thankyou: resolve(__dirname, 'thankyou.html'),
      },
    },
  },
});
