import { useEffect, useState } from "react";

import { useRouterState } from "@tanstack/react-router";

export interface DynamicSection {
  id: string;
  label: string;
}

/**
 * Scans the DOM for scrollable sections and extracts their IDs and labels.
 * Works with:
 * - Section components with id attributes
 * - Markdown headings with IDs (via rehype-slug)
 *
 * Looks for elements matching: [data-section], section[id], h2[id], h3[id]
 */
export function useDynamicSections(): DynamicSection[] {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [sections, setSections] = useState<DynamicSection[]>([]);

  useEffect(() => {
    // Small delay to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      // Only search within main content area to avoid picking up devtools, etc.
      const main = document.querySelector("main");
      if (!main) return;

      const sectionElements = main.querySelectorAll(
        "[data-section], section[id], h2[id], h3[id]"
      );

      const extractedSections: DynamicSection[] = [];

      sectionElements.forEach(el => {
        const id = el.getAttribute("id");
        if (!id) return;

        // Extract label from data-section-label, aria-label, or text content
        let label =
          el.getAttribute("data-section-label") ||
          el.getAttribute("aria-label") ||
          el.textContent?.trim() ||
          id;

        // For headings, use the heading text directly
        if (el.tagName === "H2" || el.tagName === "H3") {
          label = el.textContent?.trim() || id;
        }

        // For sections, look for a heading inside
        if (el.tagName === "SECTION") {
          const heading = el.querySelector("h1, h2, h3");
          if (heading?.textContent) {
            label = heading.textContent.trim();
          }
        }

        // Avoid duplicates
        if (!extractedSections.some(s => s.id === id)) {
          extractedSections.push({ id, label });
        }
      });

      setSections(extractedSections);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return sections;
}
