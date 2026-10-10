import { createFileRoute } from "@tanstack/react-router";

import { absoluteUrl } from "@/lib/site";
import { fetchAllPosts } from "@/lib/study";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const posts = fetchAllPosts();
        const urls = [
          { path: "/", lastmod: __BUILD_DATE__ },
          { path: "/study", lastmod: posts[0]?.frontmatter.publishedAt },
          ...posts.map(post => ({
            path: `/study/${post.slug}`,
            lastmod: post.frontmatter.publishedAt
          }))
        ];

        const body = urls
          .map(({ path, lastmod }) =>
            [
              "  <url>",
              `    <loc>${absoluteUrl(path)}</loc>`,
              lastmod && `    <lastmod>${lastmod}</lastmod>`,
              "  </url>"
            ]
              .filter(Boolean)
              .join("\n")
          )
          .join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`,
          { headers: { "Content-Type": "application/xml; charset=utf-8" } }
        );
      }
    }
  }
});
