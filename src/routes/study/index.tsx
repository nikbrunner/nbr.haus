import { createFileRoute, Link } from "@tanstack/react-router";

import Colophon from "@/components/Colophon";
import Entry from "@/components/Entry";
import Prose from "@/components/Prose";
import Rule from "@/components/Rule";
import SpecSection from "@/components/SpecSection";
import Text from "@/components/Text";
import { absoluteUrl, socialMeta } from "@/lib/site";
import { getAllPosts } from "@/lib/study";
import {
  STUDY_DESCRIPTION as DESCRIPTION,
  STUDY_TITLE as TITLE
} from "@/lib/study/meta";
import { SiteHeader } from "@/partials/SiteHeader";

export const Route = createFileRoute("/study/")({
  loader: async () => ({ posts: await getAllPosts() }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      ...socialMeta({
        title: TITLE,
        description: DESCRIPTION,
        url: absoluteUrl("/study")
      })
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/study") }]
  }),
  component: StudyIndexPage
});

function StudyIndexPage() {
  const { posts } = Route.useLoaderData();

  return (
    <>
      <SiteHeader title={["Study", "Notes on what I read"]} />
      <SpecSection
        number="01"
        title="Posts"
        note={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
      >
        <Prose>
          <p>{DESCRIPTION} Irregular.</p>
        </Prose>
        <Rule dashed />
        {posts.map(post => (
          <Entry key={post.slug} aside={post.frontmatter.publishedAt}>
            <Text caps bold>
              <Link to="/study/$slug" params={{ slug: post.slug }}>
                {post.frontmatter.title}
              </Link>
            </Text>
            <span>{post.frontmatter.excerpt}</span>
            <Text muted>
              <Text caps>Tags</Text> {post.frontmatter.tags.join(", ")}.{" "}
              <Text caps>Read</Text> {post.readingTime} min
            </Text>
          </Entry>
        ))}
      </SpecSection>
      <Colophon start="nbr.haus" center="Design via function" end="Page 1 / 1" />
    </>
  );
}
