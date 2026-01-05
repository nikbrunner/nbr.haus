import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";

interface CoverLetterFrontmatter {
  company: string;
  recipient: string;
  recipientTitle?: string;
  date: string; // YYYY-MM-DD
  position: string;
  draft?: boolean;
}

interface CoverLetter {
  slug: string;
  frontmatter: CoverLetterFrontmatter;
  content: string;
}

type CoverLetterSummary = {
  slug: string;
  company: string;
  position: string;
  draft?: boolean;
};

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

function fetchAllCoverLetters(): CoverLetterSummary[] {
  const letters: CoverLetterSummary[] = [];

  for (const key of Object.keys(contentModules)) {
    const slug = key.replace("/src/content/coverletters/", "").replace(".md", "");
    const fileContent = contentModules[key];

    if (!fileContent) continue;

    const { data } = matter(fileContent);
    const frontmatter = data as CoverLetterFrontmatter;

    // Skip drafts in production
    if (frontmatter.draft && import.meta.env.PROD) {
      continue;
    }

    letters.push({
      slug,
      company: frontmatter.company,
      position: frontmatter.position,
      draft: frontmatter.draft
    });
  }

  return letters.sort((a, b) => a.company.localeCompare(b.company));
}

export const getAllCoverLetters = createServerFn({ method: "GET" }).handler(
  async () => {
    return fetchAllCoverLetters();
  }
);
