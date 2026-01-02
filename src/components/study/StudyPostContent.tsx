import Markdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";

import { Typo } from "@/components/Typo";

const markdownComponents: Components = {
  h1: ({ children }) => <Typo.H1>{children}</Typo.H1>,
  h2: ({ children }) => <Typo.H2 variant="default">{children}</Typo.H2>,
  h3: ({ children }) => <Typo.H3>{children}</Typo.H3>,
  h4: ({ children }) => <Typo.H4>{children}</Typo.H4>,
  p: ({ children }) => <Typo.P>{children}</Typo.P>,
  blockquote: ({ children }) => <Typo.Blockquote>{children}</Typo.Blockquote>,
  ul: ({ children }) => <Typo.UnorderedList>{children}</Typo.UnorderedList>,
  ol: ({ children }) => <Typo.OrderedList>{children}</Typo.OrderedList>,
  code: ({ className, children }) => {
    // Check if it's a code block (has language class) or inline code
    const isCodeBlock = className?.startsWith("language-");
    if (isCodeBlock) {
      return <code className={className}>{children}</code>;
    }
    return <Typo.InlineCode>{children}</Typo.InlineCode>;
  },
  strong: ({ children }) => <Typo.Highlight>{children}</Typo.Highlight>
};

interface Props {
  content: string;
  className?: string;
}

export function StudyPostContent({ content, className }: Props) {
  return (
    <div className={className}>
      <Markdown rehypePlugins={[rehypeSlug]} components={markdownComponents}>
        {content}
      </Markdown>
    </div>
  );
}
