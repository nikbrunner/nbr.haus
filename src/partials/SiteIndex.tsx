import type { MouseEvent } from "react";

import { getRouteApi, Link, useLocation } from "@tanstack/react-router";

import Contents from "@/components/Contents";
import { useActiveSection } from "@/hooks/useActiveSection";
import { formatStudyNumber } from "@/lib/study";

const HOME_SECTIONS = [
  { id: "ident", number: "01", title: "Ident" },
  { id: "about", number: "02", title: "About" },
  { id: "work", number: "03", title: "Work" },
  { id: "projects", number: "04", title: "Projects" },
  { id: "how-i-work", number: "05", title: "How I work" }
];

const HOME_SECTION_IDS = HOME_SECTIONS.map(section => section.id);

const rootRoute = getRouteApi("__root__");

/** The router ignores a link to the URL it is already on, so the section would not scroll back into view */
function scrollToCurrentHash(event: MouseEvent, id: string) {
  if (window.location.pathname !== "/" || window.location.hash !== `#${id}`) return;
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView();
}

export function SiteIndex() {
  const pathname = useLocation({ select: location => location.pathname });
  const { posts } = rootRoute.useLoaderData();
  const slugs = posts.map(post => post.slug);
  const activeSection = useActiveSection(HOME_SECTION_IDS, pathname === "/");

  return (
    <Contents
      label="Index"
      items={[
        {
          key: "home",
          marker: "/",
          label: <Link to="/">Spec sheet</Link>,
          current: pathname === "/",
          children: HOME_SECTIONS.map(section => ({
            key: section.id,
            marker: section.number,
            label: (
              <Link
                to="/"
                hash={section.id}
                onClick={event => scrollToCurrentHash(event, section.id)}
              >
                {section.title}
              </Link>
            ),
            current: section.id === activeSection
          }))
        },
        {
          key: "study",
          marker: "/study",
          label: <Link to="/study">Study</Link>,
          current: pathname === "/study",
          children: posts.map(post => ({
            key: post.slug,
            marker: formatStudyNumber(slugs, post.slug),
            label: (
              <Link to="/study/$slug" params={{ slug: post.slug }}>
                {post.frontmatter.title}
              </Link>
            ),
            current: pathname === `/study/${post.slug}`
          }))
        }
      ]}
    />
  );
}
