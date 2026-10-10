import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  createRootRoute,
  HeadContent,
  retainSearchParams,
  Scripts,
  stripSearchParams
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Grain from "@/components/Grain";
import Sheet from "@/components/Sheet";
import { absoluteUrl, assetUrl, SITE_URL, socialMeta } from "@/lib/site";
import { getAllPosts } from "@/lib/study";
import { STUDY_TITLE } from "@/lib/study/meta";
import { NotFound } from "@/partials/NotFound";
import curlHintScript from "@/scripts/curl-hint.js?raw";
import themeBlockingScript from "@/scripts/theme-blocking.js?raw";
import {
  defaultRootSearchParams,
  rootSearchParamsSchema
} from "@/validators/rootSearchParams";

import globalCss from "@/styles/global.css?url";

const TITLE = "Nik Brunner, Senior Design Engineer";
const DESCRIPTION =
  "Nikolaus Brunner, Senior Design Engineer in Landshut. I build frontend architecture and design systems.";

export const Route = createRootRoute({
  validateSearch: rootSearchParamsSchema,
  search: {
    middlewares: [
      stripSearchParams(defaultRootSearchParams),
      retainSearchParams(["theme", "colorMode"])
    ]
  },
  loader: async () => ({ posts: await getAllPosts() }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  head: () => ({
    meta: [
      {
        charSet: "UTF-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      },
      {
        name: "description",
        content: DESCRIPTION
      },
      {
        name: "robots",
        content: "index, follow"
      },
      {
        name: "theme-color",
        content: "#000000"
      },
      {
        property: "og:type",
        content: "website"
      },
      ...socialMeta({
        title: TITLE,
        description: DESCRIPTION,
        image: assetUrl("/og-image.jpg")
      }),
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        title: TITLE
      }
    ],
    links: [
      {
        rel: "preload",
        href: "/fonts/TX-02/woff2/TX-02-Condensed-400.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: STUDY_TITLE,
        href: "/study/rss.xml"
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg"
      },
      {
        rel: "stylesheet",
        href: globalCss
      }
    ],
    scripts: [{ children: curlHintScript }]
  })
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nik Brunner",
    "url": SITE_URL,
    "image": absoluteUrl("/og-image.jpg"),
    "jobTitle": "Senior Design Engineer",
    "description": DESCRIPTION,
    "knowsAbout": [
      "React",
      "TypeScript",
      "GraphQL",
      "Frontend Architecture",
      "Design Systems",
      "Tailwind CSS",
      "TanStack",
      "Redux",
      "Electron"
    ],
    "alumniOf": {
      "@type": "EducationEvent",
      "name": "Self-taught Web Developer"
    },
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Landshut",
        "addressCountry": "Germany"
      }
    },
    "sameAs": ["https://github.com/nikbrunner", "https://www.linkedin.com/in/nbru/"]
  };

  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {/* Blocking script to prevent flash of incorrect theme - see src/scripts/theme-blocking.js */}
        <script dangerouslySetInnerHTML={{ __html: themeBlockingScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Sheet punched>
          <main>{children}</main>
        </Sheet>
        <Grain />
        <TanStackDevtools
          config={{
            position: "bottom-left"
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
