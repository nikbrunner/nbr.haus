import { describe, expect, it } from "vitest";

import { fillGrain, grainHash } from "@/lib/grain";

describe("grainHash", () => {
  it("stays in [0, 1) and is stable for the same input", () => {
    const values = Array.from({ length: 500 }, (_, i) =>
      grainHash(i % 37, i % 23, i)
    );

    expect(values.every(value => value >= 0 && value < 1)).toBe(true);
    expect(grainHash(4, 7, 12)).toBe(grainHash(4, 7, 12));
  });
});

describe("fillGrain", () => {
  it("only darkens in light mode, within the given depth", () => {
    const pixels = new Uint8ClampedArray(16 * 16 * 4);
    fillGrain(pixels, {
      width: 16,
      height: 16,
      frame: 3,
      isDark: false,
      lightDepth: 120
    });

    const greys = pixels.filter((_, index) => index % 4 === 0);
    expect(Math.max(...greys)).toBeLessThanOrEqual(255);
    expect(Math.min(...greys)).toBeGreaterThanOrEqual(255 - 120);
  });
});
