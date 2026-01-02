import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { StudyPostContent, StudyPostMeta } from "@/components/study";
import { Typo } from "@/components/Typo";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";
import { getAdjacentPosts, getPostBySlug, type StudyPost } from "@/lib/study";

export const Route = createFileRoute("/study/$slug")({
  loader: async ({ params }) => {
    const { slug } = params;

    // Load both locales
    const [enPost, dePost] = await Promise.all([
      getPostBySlug({ data: { slug, locale: "en" } }),
      getPostBySlug({ data: { slug, locale: "de" } })
    ]);

    // At least one locale must exist
    if (!enPost && !dePost) {
      throw notFound();
    }

    const [enAdjacent, deAdjacent] = await Promise.all([
      getAdjacentPosts({ data: { slug, locale: "en" } }),
      getAdjacentPosts({ data: { slug, locale: "de" } })
    ]);

    return {
      enPost,
      dePost,
      enAdjacent,
      deAdjacent
    };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.enPost ?? loaderData?.dePost;
    const title = post?.frontmatter.title ?? "Post Not Found";
    const description = post?.frontmatter.excerpt ?? "";

    return {
      meta: [
        { title: `${title} - Study - Nik Brunner` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        {
          property: "article:published_time",
          content: post?.frontmatter.publishedAt
        }
      ]
    };
  },
  component: StudyPostPage
});

function StudyPostPage() {
  const { enPost, dePost, enAdjacent, deAdjacent } = Route.useLoaderData();
  const { locale } = useLocale();
  const t = useTexts();

  const post: StudyPost | null = locale === "de" ? dePost : enPost;
  const adjacent = locale === "de" ? deAdjacent : enAdjacent;

  // Fallback to other locale if current locale post doesn't exist
  const displayPost = post ?? (locale === "de" ? enPost : dePost);

  if (!displayPost) {
    return (
      <div className="StudyPost">
        <Typo.H1>{t.study.notFound}</Typo.H1>
        <Link to="/study">{t.study.backToStudy}</Link>
      </div>
    );
  }

  return (
    <article className="StudyPost">
      <header className="StudyPost__header">
        <Link to="/study" className="StudyPost__back">
          ← {t.study.backToStudy}
        </Link>
        <Typo.H1>{displayPost.frontmatter.title}</Typo.H1>
        <StudyPostMeta
          publishedAt={displayPost.frontmatter.publishedAt}
          readingTime={displayPost.readingTime}
          minReadText={t.study.minRead}
          tags={displayPost.frontmatter.tags}
        />
      </header>

      <StudyPostContent
        content={displayPost.content}
        className="StudyPost__content"
      />

      <nav className="StudyPost__nav">
        {adjacent.prev && (
          <Link
            to="/study/$slug"
            params={{ slug: adjacent.prev.slug }}
            className="StudyPost__nav-link StudyPost__nav-link--prev"
          >
            ← {adjacent.prev.frontmatter.title}
          </Link>
        )}
        {adjacent.next && (
          <Link
            to="/study/$slug"
            params={{ slug: adjacent.next.slug }}
            className="StudyPost__nav-link StudyPost__nav-link--next"
          >
            {adjacent.next.frontmatter.title} →
          </Link>
        )}
      </nav>
    </article>
  );
}
