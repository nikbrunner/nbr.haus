import { defineConfig, devices } from "@playwright/test";

/** E2E_PORT lets a second run start its own server while another holds 3200 */
const PORT = Number(process.env.E2E_PORT ?? 3200);

export default defineConfig({
  testDir: "e2e",
  // One worker: parallel first loads race Vite's dependency optimization on a cold server
  workers: 1,
  use: {
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1200, height: 800 }
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1200, height: 800 },
        // Lets the audio test start playback without a real user gesture
        launchOptions: { args: ["--autoplay-policy=no-user-gesture-required"] }
      }
    }
  ],
  // Its own port, so a running `npm run dev` on 3000 is left alone
  webServer: {
    command: `vite dev --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    // The commit log stays off unless a run asks for it (`npm run test:e2e:token`): each page
    // load would otherwise spend GitHub's 60-per-hour limit
    env: { GITHUB_LOG: process.env.GITHUB_LOG ?? "off" },
    // Port 3200 is for these tests only; a UI-mode session and a CLI run can share it
    reuseExistingServer: true,
    timeout: 60_000
  }
});
