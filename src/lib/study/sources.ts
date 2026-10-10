const DEFINITION = /^\[\^([^\]]+)\]:[ \t]*(.+)$/gm;
const REFERENCE = /\[\^([^\]]+)\]/g;

interface SplitPost {
  body: string;
  sources: string[];
}

/**
 * Splits a post's footnote definitions off into its sources, numbered by first reference.
 * Each reference becomes a link to its `#source-<n>` entry.
 */
export function splitSources(content: string): SplitPost {
  const definitions = new Map<string, string>();
  const withoutDefinitions = content.replace(
    DEFINITION,
    (_, id: string, source: string) => {
      definitions.set(id, source.trim());
      return "";
    }
  );

  const order: string[] = [];
  const sources: string[] = [];
  const body = withoutDefinitions
    .trimEnd()
    .replace(REFERENCE, (reference, id: string) => {
      const source = definitions.get(id);
      if (source === undefined) return reference;

      if (!order.includes(id)) {
        order.push(id);
        sources.push(source);
      }
      const number = order.indexOf(id) + 1;
      return `[${number}](#source-${number})`;
    });

  return { body, sources };
}

/** Study numbers count posts oldest first: the first post ever is "001" */
export function formatStudyNumber(newestFirstSlugs: string[], slug: string): string {
  const position = newestFirstSlugs.length - newestFirstSlugs.indexOf(slug);
  return String(position).padStart(3, "0");
}
