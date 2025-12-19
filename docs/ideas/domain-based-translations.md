# Idea: Domain-Based Translation Structure

## Problem

Current structure organizes by page:

```
translations/
  de/
    index.ts   # Portfolio page texts
    cv.ts      # CV page texts
```

This leads to duplication — job descriptions, skills, etc. exist in both files with slightly different formats.

## Proposed Structure

Organize by content domain instead:

```
translations/
  de/
    jobs.ts       # All job-related content
    projects.ts   # All project content
    skills.ts     # All skills content
    about.ts      # About/bio section
    ui.ts         # Page-specific UI (buttons, labels, section titles)
  en/
    ...
```

## Example: jobs.ts

```ts
export const jobs = {
  lookingForJob: {
    title: "Looking for a Senior Frontend role starting February 2026."
  },
  dealerCenter: {
    company: "DealerCenter Digital",
    position: "Software Engineer / Frontend Lead",
    period: "Jan 2020 – Feb 2026",
    location: "Landshut, Germany",
    // Full paragraphs for portfolio
    description: [
      "I worked across the full spectrum of frontend development...",
      "A major focus was architectural migrations..."
      // ...
    ],
    // Bullet points for CV
    bullets: [
      "Led frontend architecture for BikeCenter...",
      "Led large-scale framework migrations..."
      // ...
    ],
    tech: "React, TypeScript, SCSS, TanStack..."
  }
  // ...
} as const;
```

## Benefits

- **Single source of truth** — update once, reflected everywhere
- **No drift** — portfolio and CV always consistent
- **Flexible** — pages pick the format they need (paragraphs vs bullets)
- **Scalable** — easy to add new pages without duplicating content

## Trade-offs

- Bigger refactor from current structure
- Files might feel less intuitive at first (not page-oriented)
- Need to update imports across components

## When to Do This

Not urgent. Current duplication is manageable for a 2-page site. Consider when:

- Adding more pages that reuse content
- Maintenance burden becomes real (texts drifting apart)
- Major i18n refactor for other reasons
