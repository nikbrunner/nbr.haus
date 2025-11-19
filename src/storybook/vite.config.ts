import path from "node:path";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: [path.resolve(__dirname, "../../tsconfig.json")]
    }),
    viteReact()
  ],
  base: "/",
  publicDir: path.resolve(__dirname, "../../public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../")
    }
  }
});
