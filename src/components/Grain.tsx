import { useEffect, useRef } from "react";

import { fillGrain, GRAIN_SETTINGS, GRAIN_TILE } from "@/lib/grain";

type Props = Partial<Record<keyof typeof GRAIN_SETTINGS, number>>;

let isMounted = false;

function bakeTiles(isDark: boolean, lightDepth: number): string[] {
  const canvas = document.createElement("canvas");
  canvas.width = GRAIN_TILE.size;
  canvas.height = GRAIN_TILE.size;
  const context = canvas.getContext("2d");
  if (!context) return [];

  const image = context.createImageData(GRAIN_TILE.size, GRAIN_TILE.size);
  return Array.from({ length: GRAIN_TILE.frames }, (_, frame) => {
    fillGrain(image.data, {
      width: GRAIN_TILE.size,
      height: GRAIN_TILE.size,
      frame,
      isDark,
      lightDepth
    });
    context.putImageData(image, 0, 0);
    return `url(${canvas.toDataURL()})`;
  });
}

export default function Grain({
  strength = GRAIN_SETTINGS.strength,
  cellSize = GRAIN_SETTINGS.cellSize,
  fps = GRAIN_SETTINGS.fps,
  blur = GRAIN_SETTINGS.blur,
  lightDepth = GRAIN_SETTINGS.lightDepth
}: Props) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(
    function runGrain() {
      const layer = layerRef.current;
      if (!layer || isMounted) return;
      isMounted = true;

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );
      const tilesByTheme = new Map<boolean, string[]>();
      let tiles: string[] = [];
      let frame = 0;
      let lastSwap = 0;
      let animationFrame = 0;

      function show() {
        layer!.style.backgroundImage = tiles[frame % tiles.length] ?? "none";
      }

      function applyTheme() {
        const colorMode = document.documentElement.getAttribute("data-color-mode");
        const isDark = colorMode ? colorMode === "dark" : prefersDark.matches;
        if (!tilesByTheme.has(isDark))
          tilesByTheme.set(isDark, bakeTiles(isDark, lightDepth));
        tiles = tilesByTheme.get(isDark) ?? [];
        layer!.style.mixBlendMode = isDark ? "soft-light" : "multiply";
        layer!.style.opacity = String(isDark ? strength : strength / 2);
        show();
      }

      function tick(time: number) {
        const isAnimated = !prefersReducedMotion.matches && !document.hidden;
        if (isAnimated && time - lastSwap >= 1000 / fps) {
          lastSwap = time;
          frame++;
          show();
        }
        animationFrame = requestAnimationFrame(tick);
      }

      layer.style.backgroundSize = `${GRAIN_TILE.size * cellSize}px`;
      layer.style.filter = `blur(${blur}px)`;
      applyTheme();

      const observer = new MutationObserver(applyTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-color-mode"]
      });
      prefersDark.addEventListener("change", applyTheme);
      animationFrame = requestAnimationFrame(tick);

      return () => {
        isMounted = false;
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
        prefersDark.removeEventListener("change", applyTheme);
      };
    },
    [strength, cellSize, fps, blur, lightDepth]
  );

  return <div ref={layerRef} className="Grain" aria-hidden="true" />;
}
