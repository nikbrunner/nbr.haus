/** A link that leaves the site: a new tab, with no access back to this page */
export default function ExternalLink(props: React.ComponentProps<"a">) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}

export function isExternalHref(href: string | undefined): boolean {
  return href !== undefined && /^https?:\/\//.test(href);
}
