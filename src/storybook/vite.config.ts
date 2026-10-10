import path from "node:path";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [viteReact()],
  base: "/",
  publicDir: path.resolve(__dirname, "../../public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../")
    }
  }
});
