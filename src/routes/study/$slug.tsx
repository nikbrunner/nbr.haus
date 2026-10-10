import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import Colophon from "@/components/Colophon";
import Entry from "@/components/Entry";
import InlineList from "@/components/InlineList";
import { SpecItem, SpecList } from "@/components/SpecList";
import SpecSection from "@/components/SpecSection";
import {
  formatStudyNumber,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  splitSources
} from "@/lib/study";
import { InlineMarkdown, MarkdownContent } from "@/partials/MarkdownContent";
import { SiteHeader } from "@/partials/SiteHeader";

export const Route = createFileRoute("/study/$slug")({
  loader: async ({ params }) => {
    const { slug } = params;

    const post = await getPostBySlug({ data: { slug } });

    if (!post) {
      throw notFound();
    }

    const [adjacent, posts] = await Promise.all([
      getAdjacentPosts({ data: { slug } }),
      getAllPosts()
    ]);
    const number = formatStudyNumber(
      posts.map(item => item.slug),
      slug
    );

    return { post, adjacent, number, ...splitSources(post.content) };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post?.frontmatter.title ?? "Post Not Found";
    const description = post?.frontmatter.excerpt ?? "";

    return {
      meta: [
        { title: `${title}, Study, Nik Brunner` },
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
  const { post, adjacent, number, body, sources } = Route.useLoaderData();
  const { title, subtitle, publishedAt, tags, audio } = post.frontmatter;
  const length = `${post.readingTime} min${sources.length > 0 ? `, ${sources.length} sources` : ""}`;

  return (
    <>
      <SiteHeader
        meta={[`Study ${number}`, publishedAt]}
        title={subtitle ? [title, subtitle] : [title]}
      />

      <article>
        <SpecSection number="00" title="Record">
          <SpecList>
            <SpecItem label="Published">{publishedAt}</SpecItem>
            <SpecItem label="Tags">{tags.join(", ")}</SpecItem>
            <SpecItem label="Length">{length}</SpecItem>
            {audio && (
              <SpecItem label="Listen">
                <audio
                  controls
                  preload="none"
                  src={`/audio/${post.slug}.mp3?v=${audio}`}
                />
              </SpecItem>
            )}
          </SpecList>
        </SpecSection>

        <SpecSection number="01" title="Text">
          <MarkdownContent content={body} numberPrefix="01" />
        </SpecSection>

        {sources.length > 0 && (
          <SpecSection number="02" title="Sources">
            {sources.map((source, index) => (
              <Entry
                key={source}
                id={`source-${index + 1}`}
                aside={`[${index + 1}]`}
              >
                <span>
                  <InlineMarkdown content={source} />
                </span>
              </Entry>
            ))}
          </SpecSection>
        )}
      </article>

      {(adjacent.prev || adjacent.next) && (
        <SpecSection number="03" title="More">
          <InlineList>
            {adjacent.prev && (
              <Link to="/study/$slug" params={{ slug: adjacent.prev.slug }}>
                ← {adjacent.prev.frontmatter.title}
              </Link>
            )}
            {adjacent.next && (
              <Link to="/study/$slug" params={{ slug: adjacent.next.slug }}>
                {adjacent.next.frontmatter.title} →
              </Link>
            )}
          </InlineList>
        </SpecSection>
      )}

      <Colophon
        start={`Study ${number}`}
        center="Design via function"
        end="Page 1 / 1"
      />
    </>
  );
}
