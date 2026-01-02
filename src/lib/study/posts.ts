import * as fs from "node:fs/promises";
import * as path from "node:path";

import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";

import { calculateReadingTime } from "@/lib/study/readingTime";
import type { StudyFrontmatter, StudyPost, StudyPostMeta } from "@/lib/study/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/study");

type Locale = "en" | "de";

async function getPostFiles(locale: Locale): Promise<string[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    return files.filter(file => file.endsWith(`.${locale}.md`));
  } catch {
    return [];
  }
}

function extractSlug(filename: string, locale: Locale): string {
  return filename.replace(`.${locale}.md`, "");
}

async function fetchAllPosts(locale: Locale): Promise<StudyPostMeta[]> {
  const files = await getPostFiles(locale);

  const posts = await Promise.all(
    files.map(async file => {
      const slug = extractSlug(file, locale);
      const filePath = path.join(CONTENT_DIR, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const frontmatter = data as StudyFrontmatter;

      if (frontmatter.draft) return null;

      return {
        slug,
        locale,
        frontmatter,
        readingTime: calculateReadingTime(content)
      };
    })
  );

  return posts
    .filter((post): post is StudyPostMeta => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

async function fetchPostBySlug(
  slug: string,
  locale: Locale
): Promise<StudyPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.${locale}.md`);

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as StudyFrontmatter;

    return {
      slug,
      locale,
      frontmatter,
      content,
      readingTime: calculateReadingTime(content)
    };
  } catch {
    return null;
  }
}

async function fetchAdjacentPosts(
  currentSlug: string,
  locale: Locale
): Promise<{ prev: StudyPostMeta | null; next: StudyPostMeta | null }> {
  const posts = await fetchAllPosts(locale);
  const currentIndex = posts.findIndex(p => p.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: posts[currentIndex + 1] ?? null,
    next: posts[currentIndex - 1] ?? null
  };
}

// Server functions that can be called from loaders
export const getAllPosts = createServerFn({ method: "GET" })
  .inputValidator((d: Locale) => d)
  .handler(async ({ data: locale }) => {
    return fetchAllPosts(locale);
  });

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; locale: Locale }) => d)
  .handler(async ({ data }) => {
    return fetchPostBySlug(data.slug, data.locale);
  });

export const getAdjacentPosts = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string; locale: Locale }) => d)
  .handler(async ({ data }) => {
    return fetchAdjacentPosts(data.slug, data.locale);
  });
