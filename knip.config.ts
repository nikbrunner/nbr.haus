import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/routes/**/*.tsx", "server/**/*.ts", "scripts/*.ts"],
  project: ["src/**/*.{ts,tsx}", "server/**/*.ts", "scripts/*.ts"],
  ignore: ["src/storybook/**/*.ts"],
  ignoreBinaries: ["pass-cli"],
  ignoreDependencies: [
    "@tanstack/router-plugin",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@testing-library/dom",
    "@testing-library/react",
    "web-vitals"
  ],
  storybook: {
    entry: ["src/**/*.stories.tsx"]
  }
};

export default config;
