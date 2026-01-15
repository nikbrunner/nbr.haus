import { useEffect, useRef } from "react";

const GRID_SIZE = 25;
const LINE_WIDTH = 0.5;
const BASE_SPEED = 0.15;
const PATTERN_LENGTH = 10000;

// Speed multipliers for variation
const MIN_SPEED_MULT = 0.035;
const MAX_SPEED_MULT = 15;

// Dash length/gap ranges for density variation
const MIN_DASH_LENGTH = 1;
const MAX_DASH_LENGTH = 25;
const MIN_GAP = 2;
const MAX_GAP = 50;

// Grid jitter range
const MAX_JITTER = 15;

interface Dash {
  start: number;
  length: number;
}

interface LineConfig {
  dashes: Dash[];
  speed: number;
  direction: 1 | -1;
  jitter: number;
}

// Seeded random number generator
function createRng(seed: number) {
  let rng = seed;
  return () => {
    rng = (rng * 1103515245 + 12345) & 0x7fffffff;
    return rng / 0x7fffffff;
  };
}

// Generate line configuration with random properties
function generateLineConfig(seed: number): LineConfig {
  const random = createRng(seed);

  // Random speed multiplier
  const speed =
    BASE_SPEED * (MIN_SPEED_MULT + random() * (MAX_SPEED_MULT - MIN_SPEED_MULT));

  // Random direction (45% chance of reverse)
  const direction = random() < 0.45 ? -1 : 1;

  // Random jitter offset
  const jitter = (random() - 0.5) * 2 * MAX_JITTER;

  // Random density for this line (affects dash/gap sizes)
  const densityFactor = 0.3 + random() * 1.4; // 0.3 to 1.7

  const minDash = MIN_DASH_LENGTH * densityFactor;
  const maxDash = MAX_DASH_LENGTH * densityFactor;
  const minGap = MIN_GAP * densityFactor;
  const maxGap = MAX_GAP * densityFactor;

  // Generate dashes
  const dashes: Dash[] = [];
  let position = 0;

  while (position < PATTERN_LENGTH) {
    const length = minDash + random() * (maxDash - minDash);
    const gap = minGap + random() * (maxGap - minGap);
    dashes.push({ start: position, length });
    position += length + gap;
  }

  return { dashes, speed, direction, jitter };
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorProbeRef = useRef<HTMLDivElement>(null);
  const horizontalLinesRef = useRef<Map<number, LineConfig>>(new Map());
  const verticalLinesRef = useRef<Map<number, LineConfig>>(new Map());
  const lineOffsetsRef = useRef<Map<number, number>>(new Map());

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

      // Regenerate lines on resize
      horizontalLinesRef.current.clear();
      verticalLinesRef.current.clear();
      lineOffsetsRef.current.clear();
    };

    const getLineConfig = (
      cache: Map<number, LineConfig>,
      lineIndex: number
    ): LineConfig => {
      if (!cache.has(lineIndex)) {
        cache.set(lineIndex, generateLineConfig(lineIndex * 31337));
      }
      return cache.get(lineIndex)!;
    };

    const getLineOffset = (lineId: number): number => {
      if (!lineOffsetsRef.current.has(lineId)) {
        lineOffsetsRef.current.set(lineId, 0);
      }
      return lineOffsetsRef.current.get(lineId)!;
    };

    const updateLineOffset = (lineId: number, speed: number, direction: number) => {
      const current = getLineOffset(lineId);
      lineOffsetsRef.current.set(lineId, current + speed * direction);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = getColor();
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";

      // Horizontal lines
      let lineIndex = 0;
      for (let baseY = 0; baseY <= height; baseY += GRID_SIZE) {
        const lineId = lineIndex;
        const config = getLineConfig(horizontalLinesRef.current, lineIndex);
        const offset = getLineOffset(lineId);
        const y = baseY + config.jitter;

        for (const dash of config.dashes) {
          const lineOffset =
            ((offset % PATTERN_LENGTH) + PATTERN_LENGTH) % PATTERN_LENGTH;
          const startX = dash.start - lineOffset;
          const endX = startX + dash.length;

          const drawDash = (sx: number, ex: number) => {
            if (ex >= 0 && sx <= width) {
              ctx.beginPath();
              ctx.moveTo(Math.max(0, sx), y);
              ctx.lineTo(Math.min(width, ex), y);
              ctx.stroke();
            }
          };

          drawDash(startX, endX);
          drawDash(startX + PATTERN_LENGTH, endX + PATTERN_LENGTH);
        }

        updateLineOffset(lineId, config.speed, config.direction);
        lineIndex++;
      }

      // Vertical lines
      lineIndex = 0;
      for (let baseX = 0; baseX <= width; baseX += GRID_SIZE) {
        const lineId = lineIndex + 10000; // Separate ID space
        const config = getLineConfig(verticalLinesRef.current, lineIndex + 10000);
        const offset = getLineOffset(lineId);
        const x = baseX + config.jitter;

        for (const dash of config.dashes) {
          const lineOffset =
            ((offset % PATTERN_LENGTH) + PATTERN_LENGTH) % PATTERN_LENGTH;
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
          drawDash(startY + PATTERN_LENGTH, endY + PATTERN_LENGTH);
        }

        updateLineOffset(lineId, config.speed, config.direction);
        lineIndex++;
      }
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
