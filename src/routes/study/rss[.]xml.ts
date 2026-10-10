import { createFileRoute } from "@tanstack/react-router";

import { absoluteUrl, escapeXml } from "@/lib/site";
import { fetchAllPosts } from "@/lib/study";
import { STUDY_DESCRIPTION, STUDY_TITLE } from "@/lib/study/meta";

export const Route = createFileRoute("/study/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const posts = fetchAllPosts();
        const items = posts
          .map(({ slug, frontmatter }) => {
            const url = absoluteUrl(`/study/${slug}`);

            return `    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(frontmatter.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(frontmatter.excerpt)}</description>
    </item>`;
          })
          .join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(STUDY_TITLE)}</title>
    <link>${absoluteUrl("/study")}</link>
    <description>${escapeXml(STUDY_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/study/rss.xml")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`,
          { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }
        );
      }
    }
  }
});
