import { createFileRoute } from "@tanstack/react-router";

import { StudyPostCard } from "@/components/study";
import { Typo } from "@/components/Typo";
import { useLocale } from "@/i18n/useLocale";
import { useTexts } from "@/i18n/useTexts";
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
  const t = useTexts();

  const posts = locale === "de" ? dePosts : enPosts;

  if (posts.length === 0) {
    return (
      <div className="StudyIndex">
        <Typo.H1>{t.study.title}</Typo.H1>
        <Typo.P>{t.study.emptyState}</Typo.P>
      </div>
    );
  }

  return (
    <div className="StudyIndex">
      <Typo.H1>{t.study.title}</Typo.H1>
      <div className="StudyIndex__list">
        {posts.map((post: StudyPostMeta) => (
          <StudyPostCard key={post.slug} post={post} minReadText={t.study.minRead} />
        ))}
      </div>
    </div>
  );
}
