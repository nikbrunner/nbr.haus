# Plan: Add `/study` Blog Feature

## Summary

Add a blog section at `/study` following the "rooms in a house" metaphor (like `/studio` for photography, `/library` for reading). Markdown files in the repo, bilingual support, minimal design.

---

## Requirements

- **Routes**: `/study` (index), `/study/$slug` (individual posts)
- **Content**: Markdown files at `src/content/study/` with locale suffix (e.g., `trust-evolution.en.md`)
- **Features**: Reading time, published date, code syntax highlighting, tags in frontmatter
- **Navigation**: Chronological list + minimal sidebar
- **Styling**: Leverage existing Typo components via react-markdown mapping

---

## Tech Stack

| Purpose | Library |
|---------|---------|
| Markdown rendering | `react-markdown` |
| Frontmatter parsing | `gray-matter` |
| Syntax highlighting | `shiki` |

---

## File Structure

```
src/
├── content/
│   └── study/
│       ├── trust-evolution.en.md
│       ├── trust-evolution.de.md
│       └── ...
├── routes/
│   └── study/
│       ├── index.tsx           # /study index
│       ├── index.css
│       ├── $slug.tsx           # /study/$slug post
│       └── $slug.css
├── components/
│   └── study/
│       ├── StudyPostCard.tsx + .css    # Post preview in list
│       ├── StudyPostMeta.tsx + .css    # Date, reading time, tags
│       ├── StudySidebar.tsx + .css     # Minimal post list
│       └── StudyPostContent.tsx + .css # Markdown wrapper + code blocks
├── lib/
│   └── study/
│       ├── posts.ts            # Load & parse posts
│       ├── types.ts            # Post type + frontmatter schema
│       └── readingTime.ts      # Word count -> minutes
└── texts/
    └── domains/
        ├── study.en.ts         # UI strings
        └── study.de.ts
```

---

## Frontmatter Schema

```yaml
---
title: The Evolution of Trust
publishedAt: 2024-01-15
excerpt: How trust changes as teams grow...
tags:
  - philosophy
  - career
draft: false
---
```

```typescript
// src/lib/study/types.ts
export interface PostFrontmatter {
  title: string;
  publishedAt: string;
  excerpt: string;
  tags: Array<"code" | "philosophy" | "tools" | "career" | "learning">;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;          // "trust-evolution"
  locale: "en" | "de";   // from filename
  readingTime: number;   // calculated
  content: string;       // raw markdown
}
```

---

## Implementation Phases

### Phase 1: Dependencies & Infrastructure

1. Install dependencies:
   ```bash
   npm install react-markdown gray-matter shiki
   ```

2. Create `src/lib/study/types.ts` - Post type definitions

3. Create `src/lib/study/readingTime.ts`:
   ```typescript
   export function calculateReadingTime(content: string): number {
     const words = content.trim().split(/\s+/).length;
     return Math.ceil(words / 200);
   }
   ```

4. Create `src/lib/study/posts.ts` - Content loading with `import.meta.glob`

### Phase 2: Routes

5. Create `src/routes/study/index.tsx` + `index.css`
   - Load all posts via loader
   - Filter by current locale
   - Render chronological list with sidebar

6. Create `src/routes/study/$slug.tsx` + `$slug.css`
   - Dynamic route with `params.slug`
   - Load post by slug + locale
   - 404 if not found or wrong locale
   - SEO meta tags in route head

### Phase 3: Components

7. Create `src/components/study/StudyPostCard.tsx` + `.css`
   - Title, excerpt, date, reading time, tags
   - Links to full post

8. Create `src/components/study/StudyPostMeta.tsx` + `.css`
   - Displays date, reading time, tag pills
   - Reusable in card and full post

9. Create `src/components/study/StudySidebar.tsx` + `.css`
   - Minimal list of all post titles
   - Highlights current post
   - Sticky positioning

10. Create `src/components/study/StudyPostContent.tsx` + `.css`
    - Wraps `react-markdown`
    - Maps elements to Typo components
    - Code block styling with shiki

### Phase 4: i18n & Polish

11. Create `src/texts/domains/study.en.ts` + `study.de.ts`
    - UI strings: "Back to all posts", "Published", "min read", etc.
    - Update barrel exports in `en.ts` and `de.ts`

12. Add sample content
    - Migrate one post from your notes as first content

13. Update docs
    - `docs/content.md` - How to add blog posts
    - `docs/architecture.md` - New routes

---

## Key Implementation Details

### Content Loading (`src/lib/study/posts.ts`)

```typescript
import matter from "gray-matter";

const modules = import.meta.glob("/src/content/study/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

export function getAllPosts(): Post[] {
  return Object.entries(modules).map(([path, content]) => {
    const filename = path.split("/").pop()!;
    const [slug, locale] = filename.replace(".md", "").split(".");
    const { data, content: body } = matter(content as string);

    return {
      slug,
      locale: locale as "en" | "de",
      content: body,
      readingTime: calculateReadingTime(body),
      ...data as PostFrontmatter
    };
  }).filter(p => !p.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string, locale: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug && p.locale === locale);
}
```

### Markdown Rendering with Typo Components

```typescript
// src/components/study/StudyPostContent.tsx
import ReactMarkdown from "react-markdown";
import { H1, H2, H3, H4, P } from "@/components/Typo";

export function StudyPostContent({ content }: { content: string }) {
  return (
    <div className="StudyPostContent">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <H1>{children}</H1>,
          h2: ({ children }) => <H2>{children}</H2>,
          h3: ({ children }) => <H3>{children}</H3>,
          h4: ({ children }) => <H4>{children}</H4>,
          p: ({ children }) => <P>{children}</P>,
          code: CodeBlock, // shiki-styled
          // ... other mappings
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

### Syntax Highlighting

Shiki runs at build time in the loader, not client-side. The HTML output includes inline styles or class-based themes.

```typescript
// In loader or posts.ts
import { codeToHtml } from "shiki";

const highlightedHtml = await codeToHtml(code, {
  lang: "typescript",
  theme: "github-dark" // or custom theme matching your accent colors
});
```

---

## Critical Files to Modify/Create

| File | Action |
|------|--------|
| `package.json` | Add dependencies |
| `src/lib/study/posts.ts` | Create - content loading |
| `src/lib/study/types.ts` | Create - type definitions |
| `src/routes/study/index.tsx` | Create - blog index |
| `src/routes/study/$slug.tsx` | Create - individual post |
| `src/components/study/*` | Create - 4 components |
| `src/texts/domains/study.*.ts` | Create - i18n strings |
| `src/texts/en.ts` + `de.ts` | Update - add study import |
| `src/styles/global.css` | Update - import new CSS files |

---

## Notes

- `lang` URL param is automatically retained across navigation (existing middleware)
- Posts filtered by `locale` at render time, not build time
- Drafts excluded via `draft: true` frontmatter
- No RSS/comments initially - can add later
