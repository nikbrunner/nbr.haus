import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/router.tsx", "src/routes/**/*.tsx", "server/**/*.ts"],
  project: ["src/**/*.{ts,tsx}", "server/**/*.ts"],
  ignore: [
    "src/routeTree.gen.ts",
    "src/storybook/**/*.ts",
    "src/storybook/**/*.tsx"
  ],
  ignoreIssues: {
    "src/components/Typo/index.ts": ["exports", "types"],
    "src/validators/rootSearchParams.ts": ["types"],
    "src/lib/study/index.ts": ["exports", "types"], // Used in Phase 3+
    "src/lib/study/types.ts": ["exports"]
  },
  ignoreDependencies: [
    "open-props",
    "@tanstack/react-router-ssr-query",
    "@tanstack/router-plugin",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-vitest",
    "@testing-library/dom",
    "@testing-library/react",
    "@vitest/coverage-v8",
    "web-vitals",
    "shiki", // Used in Phase 3 for syntax highlighting
    "vinxi" // Transitive dep of @tanstack/react-start, used for cookies
  ],
  storybook: {
    entry: ["src/**/*.stories.tsx"]
  }
};

export default config;
