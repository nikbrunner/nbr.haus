import { useEffect } from "react";

/**
 * Hook that triggers a callback when clicking outside of elements matching the selectors.
 * @param selectors - Array of CSS selectors for elements that should be considered "inside"
 * @param handler - Callback to run when clicking outside
 * @param enabled - Whether the hook is active (default: true)
 */
export function useOnClickOutside(
  selectors: string[],
  handler: () => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOutside = selectors.every(selector => !target.closest(selector));

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [selectors, handler, enabled]);
}
