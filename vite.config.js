import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    manifest: {
      short_name: "IG Live",
      name: "Simulación IG Live",
      description: "App que simula transmisiones en vivo de Instagram con cámara, chat precargado y emojis flotantes.",
      icons: [
        {
          src: "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      start_url: "/",
      display: "standalone",
      background_color: "#000000",
      theme_color: "#ffffff",
      orientation: "portrait"
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg}'],
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.pathname === '/OneSignalSDKWorker.js',
          handler: 'NetworkOnly',
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
      filename: 'vite-sw.js',
    },
  }),], resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

})
