import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Medit",
        description: "A simple bell for meditation",
        short_name: "Medit",
        scope: "/",
        start_url: "/",
        display: "standalone",
        background_color: "#242424",
        theme_color: "#242424",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*"],
        maximumFileSizeToCacheInBytes: 60 * 1024 * 1024, // 60MB in bytes
      },
      includeAssets: ["**/*"],
    }),
  ],
});
