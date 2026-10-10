import path from "node:path";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import storybookViteConfig from "./src/storybook/vite.config";

export default defineConfig({
  test: {
    projects: [
      mergeConfig(
        storybookViteConfig,
        defineConfig({
          plugins: [
            storybookTest({ configDir: path.join(__dirname, "src/storybook") })
          ],
          test: {
            name: "storybook",
            dir: path.join(__dirname, "src"),
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: "chromium" }]
            },
            setupFiles: [path.join(__dirname, "src/storybook/vitest.setup.ts")]
          }
        })
      ),
      mergeConfig(
        storybookViteConfig,
        defineConfig({
          test: {
            name: "unit",
            dir: path.join(__dirname, "src"),
            include: ["**/*.test.ts"],
            exclude: ["**/*.browser.test.ts"],
            environment: "node"
          }
        })
      ),
      mergeConfig(
        storybookViteConfig,
        defineConfig({
          test: {
            name: "dom",
            dir: path.join(__dirname, "src"),
            include: ["**/*.browser.test.ts"],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({
                // Lets the audio tests start playback without a user gesture
                launchOptions: {
                  args: ["--autoplay-policy=no-user-gesture-required"]
                }
              }),
              instances: [
                { browser: "chromium", viewport: { width: 1000, height: 800 } }
              ]
            }
          }
        })
      )
    ]
  }
});
