export const texts = {
  lookingForJob: {
    title:
      "Looking for a <highlight>Senior Frontend role</highlight> starting <highlight>February 2026.</highlight>",
    cta: "Write me!",
    copyEmailTooltip: "Copy email"
  },
  dealerCenter: {
    company: "DealerCenter Digital",
    position: "Software Engineer / Frontend Lead",
    period: "Sep 2020 – Jan 2026",
    location: "Landshut, Germany",
    // Paragraphs for index page
    paragraphs: [
      "I worked across the full spectrum of frontend development—from feature implementation and bug fixes to code reviews, mentoring, and cross-team coordination for a mature Electron application serving hundreds of bike retailers.",
      "A major focus was architectural migrations: I championed TanStack Query adoption and migrated the codebase from legacy Redux to Redux Toolkit. This included authoring comprehensive code guidelines and best practices documentation. I also completely rebuilt a Vendure storefront from Remix to TanStack Start/Router with TanStack Query, Form, GraphQL, ShadCN and Tailwind CSS.",
      "On the design system side, I created a comprehensive 10-variant color system with Figma integration, affecting 1.6k files across the codebase. BikeCenter's entire component library was built from scratch using React, TypeScript, and SCSS—no third-party UI frameworks.",
      "Improving internal APIs and establishing developer experience patterns across the team were another focus. As a trusted decision-maker for UX and technical feasibility, I bridged design and engineering, collaborating with designers as both implementer and advisor.",
      "Mentoring junior developers through pair programming and code reviews was another key part of the role. I established technical standards and conventions across the team, including translation guidelines, BEM naming, and TypeScript best practices, and served as a technical hub between management, backend, and frontend teams."
    ],
    // Summary + bullets for CV
    summary:
      "BikeCenter is an Electron-based point-of-sale application used by hundreds of bike retailers across Germany. I joined as a junior and grew into a frontend lead role, owning architecture decisions, managing frontend priorities, and mentoring newer team members.",
    bullets: [
      "Led frontend architecture for BikeCenter (Electron/React application), building and maintaining its custom design system",
      "Led large-scale framework migrations affecting 1600+ files (Redux → TanStack Query, React Router → TanStack Start)",
      "Mentored junior developers and established & documented frontend coding standards",
      "Architected modern GraphQL-based Vendure storefront and coordinated between design and backend teams",
      "Implemented component testing with Jest and Storybook snapshots",
      "Integrated external services including analytics (Mixpanel), leasing calculators, and third-party product advisers"
    ]
  },
  divaE: {
    company: "diva-e",
    position: "Junior Frontend Developer",
    period: "Mar 2020 – Sep 2020",
    location: "Munich, Germany",
    description:
      "Contributed to a major e-commerce platform and built an internal social platform using React, GraphQL (Apollo), and SCSS. When DealerCenter Digital offered a frontend position, I made the move — an opportunity better aligned with my goals."
  },
  campudus: {
    company: "Campudus",
    position: "Intern",
    period: "Dec 2019 – Feb 2020",
    location: "Landshut, Germany",
    description:
      "I built a fullstack accessories ordering application from scratch—design, architecture, backend, and frontend—during a 3-month internship at DealerCenter Digital's sister company."
  }
} as const;
