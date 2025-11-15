import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nbr.haus",
  output: "server",
  adapter: vercel(),
  prefetch: true,
  integrations: [react()]
});
