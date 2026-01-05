import Markdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";

import { Typo } from "@/components/Typo";
import type { TypoVariant } from "@/components/Typo/Typo.types";

function createMarkdownComponents(variant: TypoVariant): Components {
  return {
    h1: ({ children }) => <Typo.H1 variant={variant}>{children}</Typo.H1>,
    h2: ({ children }) => (
      <Typo.H2 variant={variant} decorated={false}>
        {children}
      </Typo.H2>
    ),
    h3: ({ children }) => <Typo.H3 variant={variant}>{children}</Typo.H3>,
    h4: ({ children }) => <Typo.H4 variant={variant}>{children}</Typo.H4>,
    p: ({ children }) => <Typo.P variant={variant}>{children}</Typo.P>,
    blockquote: ({ children }) => (
      <Typo.Blockquote variant={variant}>{children}</Typo.Blockquote>
    ),
    ul: ({ children }) => (
      <Typo.UnorderedList variant={variant}>{children}</Typo.UnorderedList>
    ),
    ol: ({ children }) => (
      <Typo.OrderedList variant={variant}>{children}</Typo.OrderedList>
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
  variant?: TypoVariant;
}

export function MarkdownContent({ content, className, variant = "web" }: Props) {
  return (
    <div className={className}>
      <Markdown
        rehypePlugins={[rehypeSlug]}
        components={createMarkdownComponents(variant)}
      >
        {content}
      </Markdown>
    </div>
  );
}
