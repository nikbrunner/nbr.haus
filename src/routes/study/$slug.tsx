import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { StudyPostContent, StudyPostMeta } from "@/components/study";
import { Typo } from "@/components/Typo";
import { getAdjacentPosts, getPostBySlug } from "@/lib/study";

export const Route = createFileRoute("/study/$slug")({
  loader: async ({ params }) => {
    const { slug } = params;

    const post = await getPostBySlug({ data: { slug } });

    if (!post) {
      throw notFound();
    }

    const adjacent = await getAdjacentPosts({ data: { slug } });

    return { post, adjacent };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
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
  const { post, adjacent } = Route.useLoaderData();

  return (
    <article className="StudyPost">
      <header className="StudyPost__header">
        <Link to="/study" className="StudyPost__back">
          ← Back to Study
        </Link>
        <div className="StudyPost__title-group">
          <Typo.H1 color="accent">{post.frontmatter.title}</Typo.H1>
          {post.frontmatter.subtitle && (
            <Typo.Lead color="support">{post.frontmatter.subtitle}</Typo.Lead>
          )}
        </div>
        <StudyPostMeta
          publishedAt={post.frontmatter.publishedAt}
          readingTime={post.readingTime}
          minReadText="min read"
          tags={post.frontmatter.tags}
        />
      </header>

      <StudyPostContent
        content={post.content}
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
