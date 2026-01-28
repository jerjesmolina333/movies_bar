import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3001,

    proxy: {
      "/api-movies": {
        target: "https://jerjesm.online",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-movies/, ""),
      },
      "/api/rss": {
        target: "https://www.milenio.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rss/, "/rss"),
      },
      "/api/auth": {
        target: "https://api.jerjesm.online",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
