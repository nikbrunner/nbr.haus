import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

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
