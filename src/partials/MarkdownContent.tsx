import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";

import Prose from "@/components/Prose";

interface Props {
  content: string;
  /** Prefix for the numbered h2s, e.g. "01" gives 01.1, 01.2 */
  numberPrefix: string;
}

export function MarkdownContent({ content, numberPrefix }: Props) {
  return (
    <Prose numberPrefix={numberPrefix}>
      <Markdown rehypePlugins={[rehypeSlug]}>{content}</Markdown>
    </Prose>
  );
}

/** Renders one line of inline Markdown without a wrapping paragraph */
export function InlineMarkdown({ content }: { content: string }) {
  return (
    <Markdown components={{ p: ({ children }) => <>{children}</> }}>
      {content}
    </Markdown>
  );
}
