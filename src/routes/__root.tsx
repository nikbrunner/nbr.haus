import { HeadContent, Scripts, createRootRoute, ClientOnly } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import Header from '../components/Header'
import AccentPicker from '../components/AccentPicker'
import NotFound from '../components/NotFound'

import globalCss from '../styles/global.css?url'
import styles from './BaseLayout.module.css'

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      {
        charSet: 'UTF-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width',
      },
      {
        name: 'description',
        content: 'Software Engineer with 5+ years of experience building frontend architectures and design systems. Specialized in React, TypeScript, and modern web technologies. Available February 2026.',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Nik Brunner - Software Engineer | Frontend Developer',
      },
      {
        property: 'og:description',
        content: 'Software Engineer with 5+ years of experience building frontend architectures and design systems. Specialized in React, TypeScript, and modern web technologies. Available February 2026.',
      },
      {
        property: 'og:image',
        content: '/og-image.jpg',
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:title',
        content: 'Nik Brunner - Software Engineer | Frontend Developer',
      },
      {
        property: 'twitter:description',
        content: 'Software Engineer with 5+ years of experience building frontend architectures and design systems. Specialized in React, TypeScript, and modern web technologies. Available February 2026.',
      },
      {
        property: 'twitter:image',
        content: '/og-image.jpg',
      },
      {
        title: 'Nik Brunner - Software Engineer | Frontend Developer',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'stylesheet',
        href: globalCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nik Brunner",
    url: "https://www.nbr.haus",
    image: "https://www.nbr.haus/og-image.jpg",
    jobTitle: "Software Engineer",
    description: "Software Engineer with 5+ years of experience building frontend architectures and design systems. Specialized in React, TypeScript, and modern web technologies. Available February 2026.",
    knowsAbout: [
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
    alumniOf: {
      "@type": "EducationEvent",
      name: "Self-taught Web Developer"
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Landshut",
        addressCountry: "Germany"
      }
    },
    sameAs: ["https://github.com/nikbrunner", "https://www.linkedin.com/in/nbru/"]
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main className={styles.baseLayout}>
          {children}
        </main>
        <ClientOnly><AccentPicker /></ClientOnly>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
