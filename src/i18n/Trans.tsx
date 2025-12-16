import type { ReactNode } from "react";

type ComponentRenderer = (children: ReactNode) => ReactNode;

interface TransProps {
  /** Translation string with tags like <link>text</link> or <highlight>text</highlight> */
  text: string;
  /** Map of tag names to render functions */
  components: Record<string, ComponentRenderer>;
}

/**
 * Trans component for interpolating React components into translation strings.
 *
 * @example
 * // Translation: "Check out my <link>dotfiles here</link>."
 * <Trans
 *   text={t.index.devStack.workflowInfo}
 *   components={{
 *     link: (children) => <Link href="https://...">{children}</Link>
 *   }}
 * />
 */
export function Trans({ text, components }: TransProps) {
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
    const renderer = components[tagName];

    if (renderer) {
      // Recursively process nested tags in content
      const hasNestedTags = /<\w+>.*?<\/\w+>/.test(content);
      const renderedContent = hasNestedTags ? (
        <Trans text={content} components={components} />
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
