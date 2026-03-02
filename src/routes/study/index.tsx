import { createFileRoute } from "@tanstack/react-router";

import { StudyPostCard } from "@/components/study";
import { Typo } from "@/components/Typo";
import { getAllPosts, type StudyPostMeta } from "@/lib/study";

export const Route = createFileRoute("/study/")({
  loader: async () => {
    const posts = await getAllPosts();
    return { posts };
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
  const { posts } = Route.useLoaderData();

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
      <div className="StudyIndex__list">
        {posts.map((post: StudyPostMeta) => (
          <StudyPostCard key={post.slug} post={post} minReadText="min read" />
        ))}
      </div>
    </div>
  );
}
