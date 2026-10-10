import Markdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";

import ExternalLink, { isExternalHref } from "@/components/ExternalLink";
import Prose from "@/components/Prose";

interface Props {
  content: string;
  /** Prefix for the numbered h2s, e.g. "01" gives 01.1, 01.2 */
  numberPrefix: string;
}

const link: Components["a"] = ({ href, children }) =>
  isExternalHref(href) ? (
    <ExternalLink href={href}>{children}</ExternalLink>
  ) : (
    <a href={href}>{children}</a>
  );

export function MarkdownContent({ content, numberPrefix }: Props) {
  return (
    <Prose numberPrefix={numberPrefix}>
      <Markdown rehypePlugins={[rehypeSlug]} components={{ a: link }}>
        {content}
      </Markdown>
    </Prose>
  );
}

/** Renders one line of inline Markdown without a wrapping paragraph */
export function InlineMarkdown({ content }: { content: string }) {
  return (
    <Markdown components={{ p: ({ children }) => <>{children}</>, a: link }}>
      {content}
    </Markdown>
  );
}
