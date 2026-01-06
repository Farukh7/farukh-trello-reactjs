import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/trello": {
        target: "https://api.trello.com/1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/trello/, ""),
      },
    },
  },
});
