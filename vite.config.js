import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // binds to 0.0.0.0 for external access
    port: 5173,
    strictPort: false,
    allowedHosts: ['hirehubfrontend-1.onrender.com'], // allow Render domain
  },
  preview: {
    host: true, // binds to 0.0.0.0
    port: process.env.PORT || 4173, // use Render port
    strictPort: false,
    allowedHosts: ['hirehubfrontend-1.onrender.com'], // allow Render domain
  },
});
