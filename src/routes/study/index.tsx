import { createFileRoute, Link } from "@tanstack/react-router";

import Colophon from "@/components/Colophon";
import Entry from "@/components/Entry";
import Prose from "@/components/Prose";
import Rule from "@/components/Rule";
import SpecSection from "@/components/SpecSection";
import Text from "@/components/Text";
import { getAllPosts } from "@/lib/study";
import { SiteHeader } from "@/partials/SiteHeader";

const DESCRIPTION =
  "Notes on what I read and what I keep thinking about afterwards.";

export const Route = createFileRoute("/study/")({
  loader: async () => ({ posts: await getAllPosts() }),
  head: () => ({
    meta: [
      { title: "Study, Nik Brunner" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Study, Nik Brunner" },
      { property: "og:description", content: DESCRIPTION }
    ]
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
