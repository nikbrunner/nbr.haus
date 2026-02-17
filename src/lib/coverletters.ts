import fs from "fs";
import os from "os";
import path from "path";

import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";

interface CoverLetterFrontmatter {
  company: string;
  recipient: string;
  recipientTitle?: string;
  date: string; // YYYY-MM-DD
  position: string;
  title: string;
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

const COVERLETTERS_DIR = path.join(
  os.homedir(),
  "repos/nikbrunner/notes/01 - Projects/New Job 2026/Coverletters"
);

function fetchCoverLetterBySlug(slug: string): CoverLetter | null {
  const filePath = path.join(COVERLETTERS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as CoverLetterFrontmatter;

  // Skip drafts in production
  if (frontmatter.draft && process.env.NODE_ENV === "production") {
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
  if (!fs.existsSync(COVERLETTERS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(COVERLETTERS_DIR);
  const mdFiles = files.filter(f => f.endsWith(".md"));
  const letters: CoverLetterSummary[] = [];

  for (const filename of mdFiles) {
    const slug = filename.replace(".md", "");
    const filePath = path.join(COVERLETTERS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    const frontmatter = data as CoverLetterFrontmatter;

    // Skip files without required frontmatter
    if (!frontmatter.company || !frontmatter.position) {
      continue;
    }

    // Skip drafts in production
    if (frontmatter.draft && process.env.NODE_ENV === "production") {
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
