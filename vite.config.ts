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
        name: "Witchy Bell",
        description: "A simple bell for witches",
        short_name: "Witchy Bell",
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
      },
      includeAssets: ["**/*"],
    }),
  ],
});
