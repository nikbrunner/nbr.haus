import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  ClientOnly,
  createRootRoute,
  HeadContent,
  retainSearchParams,
  Scripts,
  stripSearchParams
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import NotFound from "@/components/NotFound";
import ControlPanel from "@/partials/ControlPanel";
import themeBlockingScript from "@/scripts/theme-blocking.js?raw";
import globalCss from "@/styles/global.css?url";
import {
  defaultRootSearchParams,
  rootSearchParamsSchema
} from "@/validators/rootSearchParams";

export const Route = createRootRoute({
  validateSearch: rootSearchParamsSchema,
  search: {
    middlewares: [
      stripSearchParams(defaultRootSearchParams),
      retainSearchParams(["accent", "colorMode", "lang"])
    ]
  },
  notFoundComponent: NotFound,
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
        content:
          "Software Engineer with 5+ years of experience building frontend architectures and design systems. Specialized in React, TypeScript, and modern web technologies. Available February 2026."
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
      {
        property: "og:title",
        content: "Nik Brunner - Senior Frontend Developer"
      },
      {
        property: "og:description",
        content:
          "Senior Frontend Engineer with 5 years of experience. React, TypeScript, Design Systems, Technical Architecture."
      },
      {
        property: "og:image",
        content: "https://nbr.haus/og-image.jpg"
      },
      {
        property: "og:url",
        content: "https://nbr.haus"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:title",
        content: "Nik Brunner - Senior Frontend Developer"
      },
      {
        name: "twitter:description",
        content:
          "Frontend Engineer with 5 years of experience. React, TypeScript, Design Systems, Technical Architecture."
      },
      {
        name: "twitter:image",
        content: "https://nbr.haus/og-image.jpg"
      },
      {
        name: "twitter:url",
        content: "https://nbr.haus"
      },
      {
        title: "Nik Brunner - Senior Frontend Developer & Software Engineer"
      }
    ],
    links: [
      // Preload critical fonts to prevent layout shift
      {
        rel: "preload",
        href: "/fonts/TX-02/Condensed/Condensed.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        href: "/fonts/TX-02/Condensed/Bold-Condensed.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        href: "/fonts/TX-02/Condensed/Black-Condensed.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        href: "/fonts/TX-02/Condensed/Light-Condensed.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        href: "/fonts/TX-02/Condensed/SemiBold-Condensed.ttf",
        as: "font",
        type: "font/ttf",
        crossOrigin: "anonymous"
      },
      {
        rel: "canonical",
        href: "https://nbr.haus/"
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
    ]
  })
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nik Brunner",
    "url": "https://www.nbr.haus",
    "image": "https://www.nbr.haus/og-image.jpg",
    "jobTitle": "Software Engineer",
    "description":
      "Software Engineer with 5+ years of experience building frontend architectures and design systems. Specialized in React, TypeScript, and modern web technologies. Available February 2026.",
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
        {/* <Header />  faded out until completed*/}
        <main>{children}</main>
        <ClientOnly>
          <ControlPanel />
        </ClientOnly>
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
