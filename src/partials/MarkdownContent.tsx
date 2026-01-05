import Markdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";

import { Typo } from "@/components/Typo";
import type { TypoMedium } from "@/components/Typo/Typo.types";

function createMarkdownComponents(medium: TypoMedium): Components {
  return {
    h1: ({ children }) => <Typo.H1 medium={medium}>{children}</Typo.H1>,
    h2: ({ children }) => (
      <Typo.H2 medium={medium} decorated={false}>
        {children}
      </Typo.H2>
    ),
    h3: ({ children }) => <Typo.H3 medium={medium}>{children}</Typo.H3>,
    h4: ({ children }) => <Typo.H4 medium={medium}>{children}</Typo.H4>,
    p: ({ children }) => <Typo.P medium={medium}>{children}</Typo.P>,
    blockquote: ({ children }) => (
      <Typo.Blockquote medium={medium}>{children}</Typo.Blockquote>
    ),
    ul: ({ children }) => (
      <Typo.UnorderedList medium={medium}>{children}</Typo.UnorderedList>
    ),
    ol: ({ children }) => (
      <Typo.OrderedList medium={medium}>{children}</Typo.OrderedList>
    ),
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
}

interface Props {
  content: string;
  className?: string;
  medium?: TypoMedium;
}

export function MarkdownContent({ content, className, medium = "web" }: Props) {
  return (
    <div className={className}>
      <Markdown
        rehypePlugins={[rehypeSlug]}
        components={createMarkdownComponents(medium)}
      >
        {content}
      </Markdown>
    </div>
  );
}
