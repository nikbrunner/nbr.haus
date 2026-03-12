import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";

import { calculateReadingTime } from "@/lib/study/readingTime";
import type { StudyFrontmatter, StudyPost, StudyPostMeta } from "@/lib/study/types";

// Bundle content at build time using Vite glob imports
// This works in both dev and production (including Vercel serverless)
const contentModules = import.meta.glob<string>("/src/content/study/*.md", {
  eager: true,
  query: "?raw",
  import: "default"
});

const SUFFIX = ".en.md";

function getPostEntries(): Array<{ slug: string; content: string }> {
  const entries: Array<{ slug: string; content: string }> = [];

  for (const [path, content] of Object.entries(contentModules)) {
    if (path.endsWith(SUFFIX)) {
      const filename = path.split("/").pop() ?? "";
      const slug = filename.replace(SUFFIX, "");
      entries.push({ slug, content });
    }
  }

  return entries;
}

function fetchAllPosts(): StudyPostMeta[] {
  const entries = getPostEntries();

  const posts = entries
    .map(({ slug, content: fileContent }) => {
      const { data, content } = matter(fileContent);
      const frontmatter = data as StudyFrontmatter;

      if (frontmatter.draft) return null;

      return {
        slug,
        frontmatter,
        readingTime: calculateReadingTime(content)
      };
    })
    .filter((post): post is StudyPostMeta => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );

  return posts;
}

function fetchPostBySlug(slug: string): StudyPost | null {
  const key = `/src/content/study/${slug}.en.md`;
  const fileContent = contentModules[key];

  if (!fileContent) {
    return null;
  }

  const { data, content } = matter(fileContent);
  const frontmatter = data as StudyFrontmatter;

  return {
    slug,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content)
  };
}

function fetchAdjacentPosts(currentSlug: string): {
  prev: StudyPostMeta | null;
  next: StudyPostMeta | null;
} {
  const posts = fetchAllPosts();
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
export const getAllPosts = createServerFn({ method: "GET" }).handler(async () => {
  return fetchAllPosts();
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    return fetchPostBySlug(data.slug);
  });

export const getAdjacentPosts = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    return fetchAdjacentPosts(data.slug);
  });
