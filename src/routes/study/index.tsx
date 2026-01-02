import { createFileRoute, Link } from "@tanstack/react-router";

import { Typo } from "@/components/Typo";
import { useLocale } from "@/i18n/useLocale";
import { getAllPosts, type StudyPostMeta } from "@/lib/study";

export const Route = createFileRoute("/study/")({
  loader: async () => {
    // Load both locales, we'll filter client-side based on current locale
    const [enPosts, dePosts] = await Promise.all([
      getAllPosts({ data: "en" }),
      getAllPosts({ data: "de" })
    ]);
    return { enPosts, dePosts };
  },
  head: () => ({
    meta: [
      { title: "Study - Nik Brunner" },
      {
        name: "description",
        content:
          "Thoughts on code, tools, philosophy, and the craft of software development."
      },
      { property: "og:title", content: "Study - Nik Brunner" },
      {
        property: "og:description",
        content:
          "Thoughts on code, tools, philosophy, and the craft of software development."
      }
    ]
  }),
  component: StudyIndexPage
});

function StudyIndexPage() {
  const { enPosts, dePosts } = Route.useLoaderData();
  const { locale } = useLocale();

  const posts = locale === "de" ? dePosts : enPosts;

  if (posts.length === 0) {
    return (
      <div className="StudyIndex">
        <Typo.H1>Study</Typo.H1>
        <Typo.P>No posts yet. Check back soon.</Typo.P>
      </div>
    );
  }

  return (
    <div className="StudyIndex">
      <Typo.H1>Study</Typo.H1>
      <ul className="StudyIndex__list">
        {posts.map((post: StudyPostMeta) => (
          <li key={post.slug} className="StudyIndex__item">
            <Link
              to="/study/$slug"
              params={{ slug: post.slug }}
              className="StudyIndex__link"
            >
              <Typo.H3>{post.frontmatter.title}</Typo.H3>
              <Typo.P color="minor">{post.frontmatter.excerpt}</Typo.P>
              <Typo.P color="minor">
                {post.frontmatter.publishedAt} · {post.readingTime} min read
              </Typo.P>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
