/**
 * Finds components that only their own story imports. knip counts stories as entry points,
 * so it reports such a component as used.
 */
import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";

const COMPONENTS = "src/components";
const SOURCES = ["src", "server"];

const files = SOURCES.flatMap(dir =>
  readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter(file => /\.tsx?$/.test(file) && !file.endsWith(".stories.tsx"))
    .map(file => join(dir, file))
);
const contents = new Map(files.map(file => [file, readFileSync(file, "utf8")]));

const unused = readdirSync(COMPONENTS)
  .filter(file => file.endsWith(".tsx") && !file.endsWith(".stories.tsx"))
  .map(file => basename(file, ".tsx"))
  .filter(name => {
    const own = join(COMPONENTS, `${name}.tsx`);
    const importPath = new RegExp(`["'][^"']*/components/${name}["']`);
    return ![...contents].some(
      ([file, text]) => file !== own && importPath.test(text)
    );
  });

if (unused.length > 0) {
  console.error(
    `Components imported only by their stories:\n  ${unused.join("\n  ")}`
  );
  process.exit(1);
}
