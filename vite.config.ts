import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Served from https://marquespq.github.io/portfolio/
  base: "/portfolio/",
  plugins: [react(), tailwindcss()],
});
