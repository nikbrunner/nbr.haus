import { createFileRoute, Link } from "@tanstack/react-router";

import { getAllCoverLetters } from "@/lib/coverletters";

import "@/routes/cover/index.css";

export const Route = createFileRoute("/cover/")({
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
        <p className="CoverIndex__empty">
          No cover letters found. Add markdown files with the required frontmatter to
          the notes Coverletters folder.
        </p>
      )}
    </div>
  );
}
