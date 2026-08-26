import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Klipper Mobile',
        short_name: 'Klipper',
        description: 'Mobile companion for Klipper',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        "screenshots": [
          {
            "src": "/screenshots/screenshot-mobile-home.png",
            "sizes": "1070x2532",
            "type": "image/png",
            "form_factor": "narrow"
          },
          {
            "src": "/screenshots/screenshot-mobile-settings.png",
            "sizes": "631x1366",
            "type": "image/png",
            "form_factor": "narrow"
          }
        ]
      }
    })  
  ],
})
