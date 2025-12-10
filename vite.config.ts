import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

const config = defineConfig({
  build: {
    // Disable CSS code splitting to prevent FOUC in SSR
    // All CSS will be bundled together and loaded upfront
    cssCodeSplit: false
  },
  plugins: [
    devtools(),
    nitro({
      serverDir: "./server"
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"]
    }),
    tanstackStart(),
    viteReact()
  ]
});

export default config;
