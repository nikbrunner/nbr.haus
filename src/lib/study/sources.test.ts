import { describe, expect, it } from "vitest";

import { formatStudyNumber, splitSources } from "@/lib/study/sources";

describe("splitSources", () => {
  it("numbers footnotes by first reference and links them to their source", () => {
    const content =
      "Intro.[^b]\n\nText.[^a] Again.[^b]\n\n[^a]: First, 2024.\n\n[^b]: Second, 2025.\n";

    expect(splitSources(content)).toEqual({
      body: "Intro.[1](#source-1)\n\nText.[2](#source-2) Again.[1](#source-1)",
      sources: ["Second, 2025.", "First, 2024."]
    });
  });

  it("joins a definition's indented continuation lines", () => {
    const content =
      "Text.[^a]\n\n[^a]:\n    Author, Name.\n    [Title](https://example.com) 2024.\n";

    expect(splitSources(content)).toEqual({
      body: "Text.[1](#source-1)",
      sources: ["Author, Name. [Title](https://example.com) 2024."]
    });
  });

  it("leaves references without a definition as written", () => {
    expect(splitSources("Text.[^missing]")).toEqual({
      body: "Text.[^missing]",
      sources: []
    });
  });

  it("keeps the whole post as body without footnotes", () => {
    expect(splitSources("Just text.")).toEqual({ body: "Just text.", sources: [] });
  });
});

describe("formatStudyNumber", () => {
  it("numbers posts oldest first with three digits", () => {
    const newestFirst = ["third", "second", "first"];

    expect(formatStudyNumber(newestFirst, "first")).toBe("001");
    expect(formatStudyNumber(newestFirst, "third")).toBe("003");
  });
});
