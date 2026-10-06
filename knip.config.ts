import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/routes/**/*.tsx", "server/**/*.ts"],
  project: ["src/**/*.{ts,tsx}", "server/**/*.ts"],
  ignore: ["src/storybook/**/*.ts", "src/storybook/**/*.tsx"],
  ignoreIssues: {
    "src/components/Typo/index.ts": ["exports", "types"],
    "src/validators/rootSearchParams.ts": ["types"],
    "src/lib/study/index.ts": ["exports", "types"], // Used in Phase 3+
    "src/lib/study/types.ts": ["exports", "types"]
  },
  ignoreDependencies: [
    "open-props",
    "@tanstack/react-router-ssr-query",
    "@tanstack/router-plugin",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@testing-library/dom",
    "@testing-library/react",
    "web-vitals",
    "shiki" // Used in Phase 3 for syntax highlighting
  ],
  storybook: {
    entry: ["src/**/*.stories.tsx"]
  }
};

export default config;
