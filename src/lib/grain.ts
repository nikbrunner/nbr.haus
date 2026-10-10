/** Grain defaults, ported from the Black Atom Ghostty grain shader */
export const GRAIN_SETTINGS = {
  /** Opacity in dark mode; light mode uses four fifths of it */
  strength: 0.2,
  /** CSS pixels per noise cell */
  cellSize: 1,
  /** Re-rolls per second */
  fps: 10,
  /** Blur radius in CSS pixels */
  blur: 0.6,
  /** How far light-mode grain darkens, 0 to 255 */
  lightDepth: 120
} as const;

/** Noise is baked once per theme into this many square tiles, then cycled */
export const GRAIN_TILE = { size: 256, frames: 8 } as const;

function fract(value: number): number {
  return value - Math.floor(value);
}

/** Hashed noise in [0, 1), ported from the Black Atom Ghostty grain shader */
export function grainHash(x: number, y: number, frame: number): number {
  let qx = fract(x * 0.1031);
  let qy = fract(y * 0.103);
  let qz = fract((frame % 997) * 0.0973);
  const dot = qx * (qy + 33.33) + qy * (qx + 33.33) + qz * (qz + 33.33);
  qx += dot;
  qy += dot;
  qz += dot;
  return fract((qx + qy) * qz);
}

interface FillOptions {
  width: number;
  height: number;
  frame: number;
  isDark: boolean;
  lightDepth: number;
}

/**
 * Fills RGBA pixels with grey noise. Light mode only darkens (values at or below white,
 * for multiply); dark mode spans the full range (for soft-light).
 */
export function fillGrain(
  pixels: Uint8ClampedArray,
  { width, height, frame, isDark, lightDepth }: FillOptions
): void {
  let index = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const noise = grainHash(x, y, frame);
      const value = isDark ? noise * 255 : 255 - Math.pow(noise, 1.6) * lightDepth;
      pixels[index] = value;
      pixels[index + 1] = value;
      pixels[index + 2] = value;
      pixels[index + 3] = 255;
      index += 4;
    }
  }
}
