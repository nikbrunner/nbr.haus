import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";

import type { CoverLetter, CoverLetterFrontmatter } from "@/lib/coverletters/types";

// Bundle content at build time using Vite glob imports
// This works in both dev and production (including Vercel serverless)
const contentModules = import.meta.glob<string>("/src/content/coverletters/*.md", {
  eager: true,
  query: "?raw",
  import: "default"
});

function fetchCoverLetterBySlug(slug: string): CoverLetter | null {
  const key = `/src/content/coverletters/${slug}.md`;
  const fileContent = contentModules[key];

  if (!fileContent) {
    return null;
  }

  const { data, content } = matter(fileContent);
  const frontmatter = data as CoverLetterFrontmatter;

  // Skip drafts in production
  if (frontmatter.draft && import.meta.env.PROD) {
    return null;
  }

  return {
    slug,
    frontmatter,
    content
  };
}

export const getCoverLetterBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: string) => d)
  .handler(async ({ data: slug }) => {
    return fetchCoverLetterBySlug(slug);
  });
