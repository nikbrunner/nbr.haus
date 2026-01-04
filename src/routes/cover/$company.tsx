import { createFileRoute, notFound } from "@tanstack/react-router";

import { CoverLetterHeader } from "@/components/coverletter";
import { useTexts } from "@/i18n/useTexts";
import { getCoverLetterBySlug } from "@/lib/coverletters";
import { MarkdownContent } from "@/partials/MarkdownContent";

import "@/routes/cover/$company.css";

export const Route = createFileRoute("/cover/$company")({
  loader: async ({ params }) => {
    const coverLetter = await getCoverLetterBySlug({ data: params.company });

    if (!coverLetter) {
      throw notFound();
    }

    return { coverLetter };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Cover Letter - ${loaderData?.coverLetter.frontmatter.company ?? "Unknown"}`
      },
      { name: "robots", content: "noindex" }
    ]
  }),
  component: CoverLetterPage
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function CoverLetterPage() {
  const { coverLetter } = Route.useLoaderData();
  const t = useTexts();

  return (
    <article className="CoverLetterPage">
      <CoverLetterHeader
        senderName={t.shared.name}
        senderContact={{
          location: t.cv.contact.location,
          email: t.cv.contact.email,
          website: t.cv.contact.website
        }}
        date={formatDate(coverLetter.frontmatter.date)}
        recipient={coverLetter.frontmatter.recipient}
        recipientTitle={coverLetter.frontmatter.recipientTitle}
        company={coverLetter.frontmatter.company}
      />

      <MarkdownContent
        content={coverLetter.content}
        className="CoverLetterPage__content"
        variant="print"
      />

      <footer className="CoverLetterPage__signature">
        <p>Best regards,</p>
        <p className="CoverLetterPage__signature-name">{t.shared.name}</p>
      </footer>
    </article>
  );
}
