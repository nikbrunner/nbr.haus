import { readFile } from "node:fs/promises";
import { basename } from "node:path";

import matter from "gray-matter";

import { audioHash } from "./study-audio.ts";

for (const postPath of process.argv.slice(2)) {
  const file = await readFile(postPath, "utf8");
  const { data } = matter(file);
  if (data.draft) continue;

  if (data.audio !== audioHash(file)) {
    const slug = basename(postPath, ".en.md");
    console.warn(
      `Audio for "${slug}" is out of date. Regenerate it with: npm run generate:audio -- ${slug}`
    );
  }
}
