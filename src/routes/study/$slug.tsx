import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import AudioPlayer from "@/components/AudioPlayer";
import Colophon from "@/components/Colophon";
import Entry from "@/components/Entry";
import InlineList from "@/components/InlineList";
import { SpecItem, SpecList } from "@/components/SpecList";
import SpecSection from "@/components/SpecSection";
import { absoluteUrl, SITE_URL, socialMeta } from "@/lib/site";
import {
  formatStudyNumber,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  splitSources
} from "@/lib/study";
import { STUDY_VOICES, studyAudioPath } from "@/lib/study/voices";
import { InlineMarkdown, MarkdownContent } from "@/partials/MarkdownContent";
import { NotFound } from "@/partials/NotFound";
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

    if (!post) {
      return { meta: [{ title: "Post Not Found" }] };
    }

    const { title, excerpt, publishedAt, tags, audio } = post.frontmatter;
    const url = absoluteUrl(`/study/${post.slug}`);
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": excerpt,
      "datePublished": publishedAt,
      "url": url,
      "mainEntityOfPage": url,
      "inLanguage": "en",
      "keywords": tags,
      "image": absoluteUrl("/og-image.jpg"),
      "author": { "@type": "Person", "name": "Nik Brunner", "url": SITE_URL },
      ...(audio && {
        audio: {
          "@type": "AudioObject",
          "contentUrl": absoluteUrl(studyAudioPath(post.slug, STUDY_VOICES[0].id)),
          "encodingFormat": "audio/mpeg"
        }
      })
    };

    return {
      meta: [
        { title: `${title}, Study, Nik Brunner` },
        { name: "description", content: excerpt },
        ...socialMeta({ title, description: excerpt, url }),
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: publishedAt }
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(structuredData) }
      ]
    };
  },
  component: StudyPostPage,
  notFoundComponent: () => (
    <NotFound
      title="Study not found"
      message={
        <>
          There is no study at this address. It may have been renamed;{" "}
          <Link to="/study">the study list</Link> has all of them.
        </>
      }
    />
  )
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
              <SpecItem label="Listen" hideInPrint>
                <AudioPlayer
                  track={{
                    slug: post.slug,
                    title,
                    voices: STUDY_VOICES.map(voice => ({
                      id: voice.id,
                      label: voice.label,
                      src: `${studyAudioPath(post.slug, voice.id)}?v=${audio}`
                    }))
                  }}
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
