import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import pluginReact from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  {
    name: "project/ignore-ide-and-tooling-files",
    ignores: [".claude/*", ".vscode/*", "docs/ai/*", "package-lock.json"]
  },
  {
    name: "project/javascript-and-typescript-base-config",
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  ...tseslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    name: "project/enforce-absolute-imports",
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/routeTree.gen.ts"],
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths
    },
    rules: {
      // Plugin options are broken (Issue #35), using without options
      // This catches ../ imports but also flags ./ same-folder imports
      "no-relative-import-paths/no-relative-import-paths": "error"
    }
  },
  {
    name: "project/react-recommended-config",
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    name: "project/react-hooks-rules",
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...reactHooks.configs.flat["recommended-latest"]
  },
  {
    name: "project/json-strict-validation",
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"]
  },
  {
    name: "project/jsonc-with-comments-and-tsconfig",
    files: ["**/*.jsonc", "**/tsconfig*.json"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"]
  },
  {
    name: "project/json5-extended-syntax",
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"]
  },
  {
    name: "project/markdown-gfm-linting",
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"]
  },
  {
    name: "project/css-modules-with-custom-properties",
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    languageOptions: {
      tolerant: true
    },
    rules: {
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
      "css/use-baseline": [
        "error",
        {
          allowProperties: ["break-after", "break-inside", "text-wrap-style"],
          allowAtRules: ["page"],
          allowSelectors: ["nesting", "selection"],
          allowFunctions: ["oklch", "light-dark", "color-mix"]
        }
      ]
    }
  },
  {
    name: "project/global-css-oklch-color-exception",
    // global.css uses nested CSS custom properties in oklch() color functions
    // ESLint resolves var(--hue) to bare numbers (e.g., "0", "180") and incorrectly
    // flags them as invalid colors, even though they're valid hue values in context
    files: ["src/styles/global.css"],
    rules: {
      "css/no-invalid-properties": "off"
    }
  }
]);
