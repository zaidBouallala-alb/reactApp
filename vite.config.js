import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Assuming you have this for React
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow external connections (needed for TestSprite)
    port: 5173,
    strictPort: true,
  },
  plugins: [react(), tailwindcss()],
});
