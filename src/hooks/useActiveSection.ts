import { useEffect, useState } from "react";

/** A section counts as current once its top passes this share of the viewport height */
const READING_LINE = 0.3;

/** The id of the section being read: the last one whose top has passed the reading line */
export function useActiveSection(ids: string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(" ");

  useEffect(
    function trackActiveSection() {
      if (!enabled) return;

      function update() {
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        let current: string | null = null;
        for (const id of key.split(" ")) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          if (top !== undefined && top <= window.innerHeight * READING_LINE)
            current = id;
        }
        setActive(atBottom ? (key.split(" ").at(-1) ?? current) : current);
      }

      const frame = requestAnimationFrame(update);
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    },
    [key, enabled]
  );

  return enabled ? active : null;
}
