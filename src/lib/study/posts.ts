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

type Locale = "en" | "de";

function getPostEntries(locale: Locale): Array<{ slug: string; content: string }> {
  const suffix = `.${locale}.md`;
  const entries: Array<{ slug: string; content: string }> = [];

  for (const [path, content] of Object.entries(contentModules)) {
    if (path.endsWith(suffix)) {
      // Extract slug from path: /src/content/study/my-post.en.md -> my-post
      const filename = path.split("/").pop() ?? "";
      const slug = filename.replace(suffix, "");
      entries.push({ slug, content });
    }
  }

  return entries;
}

function fetchAllPosts(locale: Locale): StudyPostMeta[] {
  const entries = getPostEntries(locale);

  const posts = entries
    .map(({ slug, content: fileContent }) => {
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
    .filter((post): post is StudyPostMeta => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );

  return posts;
}

function fetchPostBySlug(slug: string, locale: Locale): StudyPost | null {
  const key = `/src/content/study/${slug}.${locale}.md`;
  const fileContent = contentModules[key];

  if (!fileContent) {
    return null;
  }

  const { data, content } = matter(fileContent);
  const frontmatter = data as StudyFrontmatter;

  return {
    slug,
    locale,
    frontmatter,
    content,
    readingTime: calculateReadingTime(content)
  };
}

function fetchAdjacentPosts(
  currentSlug: string,
  locale: Locale
): { prev: StudyPostMeta | null; next: StudyPostMeta | null } {
  const posts = fetchAllPosts(locale);
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
