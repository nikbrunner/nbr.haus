import type { PluginConfig } from "@ianvs/prettier-plugin-sort-imports";
import type { Config } from "prettier";

const config: Config & PluginConfig = {
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  jsxSingleQuote: false,
  printWidth: 85,
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[.]",
    "",
    "\\.css$"
  ],
  importOrderTypeScriptVersion: "5.0.0"
};

export default config;
