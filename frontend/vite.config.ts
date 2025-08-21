import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
        react(),
        tailwindcss(),
        VitePWA({
          registerType: "autoUpdate",
          includeAssets: ["favicon.svg", "robots.txt"],
          manifest:{
            name: "Typing Practice App",
            short_name: "Blowtype",
            description: "App de prática de digitação offline",
            theme_color: "#ffffff",
            start_url: "/",
            display: "standalone",
            icons: [
              {
                src: "pwa-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
              {
                src: "pwa-512x512.png",
                sizes: "512x512",
                type: "image/png",
              },
            ],
          },
          workbox: {
            runtimeCaching:[
              {
                urlPattern: ({request}) => request.mode === "navigate",
                handler: "NetworkFirst",

                options:{
                  cacheName: "pages-cache",
                  expiration: {maxEntries: 10},
                }
              },
              {
                urlPattern: ({ request }) => 
                  ["style", "script", "image"].includes(request.destination),
                handler: "CacheFirst",

                options:{
                  cacheName: "assets-cache",
                  expiration: {maxEntries: 40},
                }
              }
            ]
          }
        })
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
  },
})
