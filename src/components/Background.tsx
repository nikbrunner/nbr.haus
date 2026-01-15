import { useEffect, useRef } from "react";

const GRID_SIZE = 40;
const MIN_DASH_LENGTH = 2;
const MAX_DASH_LENGTH = 12;
const MIN_GAP = 4;
const MAX_GAP = 10;
const LINE_WIDTH = 1;
const SPEED = 0.2;

interface Dash {
  start: number;
  length: number;
  gap: number;
}

// Generate a long sequence of dashes for a line
function generateDashes(seed: number, totalLength: number): Dash[] {
  const dashes: Dash[] = [];
  let position = 0;
  let rng = seed;

  const random = () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng / 0x7fffffff;
  };

  while (position < totalLength) {
    const length = MIN_DASH_LENGTH + random() * (MAX_DASH_LENGTH - MIN_DASH_LENGTH);
    const gap = MIN_GAP + random() * (MAX_GAP - MIN_GAP);
    dashes.push({ start: position, length, gap });
    position += length + gap;
  }

  return dashes;
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorProbeRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const horizontalDashesRef = useRef<Map<number, Dash[]>>(new Map());
  const verticalDashesRef = useRef<Map<number, Dash[]>>(new Map());
  const patternLengthRef = useRef(10000);

  useEffect(() => {
    const canvas = canvasRef.current;
    const colorProbe = colorProbeRef.current;
    if (!canvas || !colorProbe) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getColor = (): string => {
      return getComputedStyle(colorProbe).backgroundColor;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Regenerate dashes on resize
      horizontalDashesRef.current.clear();
      verticalDashesRef.current.clear();
    };

    const getDashes = (
      cache: Map<number, Dash[]>,
      lineIndex: number
    ): Dash[] => {
      if (!cache.has(lineIndex)) {
        cache.set(lineIndex, generateDashes(lineIndex * 31337, patternLengthRef.current));
      }
      return cache.get(lineIndex)!;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = getColor();
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";

      const offset = offsetRef.current;
      const patternLength = patternLengthRef.current;

      // Horizontal lines (dashes moving right)
      let lineIndex = 0;
      for (let y = 0; y <= height; y += GRID_SIZE) {
        const dashes = getDashes(horizontalDashesRef.current, lineIndex);
        const lineOffset = offset % patternLength;

        for (const dash of dashes) {
          const startX = dash.start - lineOffset;
          const endX = startX + dash.length;

          // Also draw wrapped version for seamless loop
          const drawDash = (sx: number, ex: number) => {
            if (ex >= 0 && sx <= width) {
              ctx.beginPath();
              ctx.moveTo(Math.max(0, sx), y);
              ctx.lineTo(Math.min(width, ex), y);
              ctx.stroke();
            }
          };

          drawDash(startX, endX);
          drawDash(startX + patternLength, endX + patternLength);
        }
        lineIndex++;
      }

      // Vertical lines (dashes moving down)
      lineIndex = 0;
      for (let x = 0; x <= width; x += GRID_SIZE) {
        const dashes = getDashes(verticalDashesRef.current, lineIndex + 10000);
        const lineOffset = offset % patternLength;

        for (const dash of dashes) {
          const startY = dash.start - lineOffset;
          const endY = startY + dash.length;

          const drawDash = (sy: number, ey: number) => {
            if (ey >= 0 && sy <= height) {
              ctx.beginPath();
              ctx.moveTo(x, Math.max(0, sy));
              ctx.lineTo(x, Math.min(height, ey));
              ctx.stroke();
            }
          };

          drawDash(startY, endY);
          drawDash(startY + patternLength, endY + patternLength);
        }
        lineIndex++;
      }

      offsetRef.current += SPEED;
    };

    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="background">
      <div
        ref={colorProbeRef}
        className="background__color-probe"
        style={{ backgroundColor: "var(--color-fg-accent)" }}
      />
      <canvas ref={canvasRef} className="background__canvas" />
    </div>
  );
}
