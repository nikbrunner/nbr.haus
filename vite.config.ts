import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    // Origin the social preview image loads from, so previews and localhost show their own
    __ASSET_ORIGIN__: JSON.stringify(
      process.env.VERCEL_ENV === "production"
        ? "https://nbr.haus"
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
    )
  },
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    devtools(),
    nitro({
      serverDir: "./server"
    }),
    tanstackStart(),
    viteReact()
  ]
});

export default config;
