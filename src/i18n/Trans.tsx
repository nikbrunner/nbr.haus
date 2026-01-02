import type { ReactNode } from "react";

import { Typo } from "@/components/Typo";

type ComponentRenderer = (children: ReactNode) => ReactNode;

/** Default component renderers for common tags */
const defaultComponents: Record<string, ComponentRenderer> = {
  strong: children => <strong>{children}</strong>,
  em: children => <em>{children}</em>,
  highlight: children => <Typo.Highlight>{children}</Typo.Highlight>
};

interface TransProps {
  /** Translation string with tags like <link>text</link> or <highlight>text</highlight> */
  children: string;
  /** Map of tag names to render functions. Merged with defaults (strong, em, highlight). */
  components?: Record<string, ComponentRenderer>;
}

/**
 * Trans component for interpolating React components into translation strings.
 *
 * @example
 * // Translation: "Check out my <link>dotfiles here</link>."
 * <Trans components={{ link: (children) => <Link href="...">{children}</Link> }}>
 *   {t.index.devStack.workflowInfo}
 * </Trans>
 *
 * // With defaults only (strong, em, highlight)
 * <Trans>{t.about.ux}</Trans>
 */
export function Trans({ children: text, components = {} }: TransProps) {
  const mergedComponents = { ...defaultComponents, ...components };

  // Regex to match <tagName>content</tagName>
  const tagPattern = /<(\w+)>(.*?)<\/\1>/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = tagPattern.exec(text)) !== null) {
    // Add text before the tag
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const [, tagName, content] = match;
    const renderer = mergedComponents[tagName];

    if (renderer) {
      // Recursively process nested tags in content
      const hasNestedTags = /<\w+>.*?<\/\w+>/.test(content);
      const renderedContent = hasNestedTags ? (
        <Trans components={mergedComponents}>{content}</Trans>
      ) : (
        content
      );

      parts.push(<span key={keyIndex++}>{renderer(renderedContent)}</span>);
    } else {
      // Unknown tag, render as plain text
      parts.push(content);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after last tag
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
