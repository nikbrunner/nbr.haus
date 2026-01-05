import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { checkCoverAuth, getAllCoverLetters } from "@/lib/coverletters";

import "@/routes/cover/index.css";

export const Route = createFileRoute("/cover/")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = await checkCoverAuth();

    if (!isAuthenticated) {
      throw redirect({
        to: "/cover/login",
        search: { redirect: location.href }
      });
    }
  },
  loader: async () => {
    const letters = await getAllCoverLetters();
    return { letters };
  },
  head: () => ({
    meta: [{ title: "Cover Letters" }, { name: "robots", content: "noindex" }]
  }),
  component: Page
});

function Page() {
  const { letters } = Route.useLoaderData();

  return (
    <div className="CoverIndex">
      <h1 className="CoverIndex__title">Cover Letters</h1>

      <ul className="CoverIndex__list">
        {letters.map(letter => (
          <li key={letter.slug} className="CoverIndex__item">
            <Link
              to="/cover/$company"
              params={{ company: letter.slug }}
              className="CoverIndex__link"
            >
              <span className="CoverIndex__company">{letter.company}</span>
              <span className="CoverIndex__position">{letter.position}</span>
              {letter.draft && <span className="CoverIndex__draft">Draft</span>}
            </Link>
          </li>
        ))}
      </ul>

      {letters.length === 0 && (
        <p className="CoverIndex__empty">No cover letters available.</p>
      )}
    </div>
  );
}
