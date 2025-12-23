export const texts = {
  printButton: "Print CV",
  tagline:
    "Software Engineer specializing in Frontend Development with {years} years of experience in building modern web applications",
  summary:
    "Specialized in design systems, frontend architecture, and large-scale migrations. Led technical decisions affecting thousands of files and mentored junior developers. Comfortable working independently while thriving in collaborative teams. Integrates AI tooling into daily development workflows.",
  contact: {
    location: "Landshut, Germany",
    website: "nbr.haus",
    email: "nik@nbr.haus",
    github: "github.com/nikbrunner",
    linkedin: "linkedin.com/in/nbru"
  },
  sections: {
    workExperience: "Work Experience",
    sideProjects: "Side Projects",
    technicalSkills: "Technical Skills",
    priorExperience: "Prior professional experience",
    education: "Education",
    interests: "Interests"
  },
  jobs: {
    dealerCenter: {
      company: "DealerCenter Digital",
      position: "Software Engineer / Frontend Lead",
      period: "Sep 2020 – Jan 2026",
      location: "Landshut, Germany",
      description:
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
  },
  projects: {
    blackAtom: {
      subtitle: "Open Source Theming System • Creator & Maintainer",
      bullets: [
        "Created theming system supporting 27+ themes across 6 platforms (Zed, WezTerm, Alacritty, Ghostty, Neovim)",
        "Built with TypeScript, featuring automated theme generation and distribution"
      ]
    },
    awdcs: {
      subtitle: "Modal Editor Keymap Architecture",
      bullets: [
        "Designed scope-based keymap system (App, Workspace, Document, Change, Symbol) for modal editors",
        "Created systematic prefix patterns and semantic naming for consistent, memorable keybindings"
      ]
    },
    koyo: {
      subtitle: "QMK Keyboard Layout & Firmware",
      bullets: [
        "Custom QMK layout for 36-key split keyboards (Moonlander, Corne) with vim-inspired navigation",
        "Built comprehensive CLI tooling for keyboard configuration and deployment"
      ]
    }
  },
  skills: {
    frontend: "Frontend",
    frontendList:
      "React, TypeScript, JavaScript, GraphQL, CSS/SCSS/Tailwind, ShadCN, TanStack (Router/Query/Form), Redux, Electron, Node.js, Git",
    devTools: "Dev Tools",
    devToolsList: "Neovim, Ghostty, LazyGit, Claude Code",
    architecture: "Architecture",
    architectureList:
      "Design Systems, Component Architecture, Frontend Migrations, UX Collaboration",
    languages: "Languages",
    languagesList: "German (Native) • English (Fluent)"
  },
  priorExperience: {
    title: "Event Technology & Audio Engineering (2011–2019)",
    description:
      "Extensive background in event technology, professional sound engineering, and photography. Worked at five-star hotels and premium studios, developing strong problem-solving and client communication skills."
  },
  education: "Sound Engineering & Mastering, Deutsche Pop Munich (2010–2011)",
  interests:
    "Landscape Photography • Workflow Optimization • Open Source • Music Production"
} as const;
