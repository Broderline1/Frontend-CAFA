import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    allowedHosts: [
      ".ngrok-free.app"
    ],
    host: true,
    port: 4200
  }
});