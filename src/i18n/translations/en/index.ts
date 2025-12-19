export const index = {
  about: {
    greeting: "Hi there!",
    intro:
      "I'm <highlight>Nikolaus Brunner</highlight> (Nik for short), a Software Engineer based in Landshut, Germany, specializing in frontend architectures and design systems — {years} years in.",
    ux: "A strong sense for UX (user experience) and DX (developer experience) guides my work—whether collaborating with designers or making design decisions independently.",
    independence:
      "Identifying priorities and managing my own work comes naturally—as does knowing when to reach out for input. Being part of a good team working towards a shared goal is where I thrive.",
    passion:
      "Building and using products is a genuine passion—I'm probably the guy who contacts support about features or bugs, and regularly checks changelogs and GitHub releases.",
    personal:
      "Born in 1984, and outside of code: hiking, reading, landscape photography, music production, workflow optimization, and open source — plus a slight keyboard obsession."
  },
  jobs: {
    lookingForJob: {
      title: "I am currently seeking new opportunities starting February 2026."
    },
    dealerCenter: {
      company: "DealerCenter Digital",
      position: "Software Engineer / Frontend Lead",
      period: "2020–2026",
      p1: "I worked across the full spectrum of frontend development—from feature implementation and bug fixes to code reviews, mentoring, and cross-team coordination for a mature Electron application serving hundreds of bike retailers.",
      p2: "A major focus was architectural migrations: I championed TanStack Query adoption and migrated the codebase from legacy Redux to Redux Toolkit. This included authoring comprehensive code guidelines and best practices documentation. I also completely rebuilt a Vendure storefront from Remix to TanStack Start/Router with TanStack Query, Form, GraphQL, ShadCN and Tailwind CSS.",
      p3: "On the design system side, I created a comprehensive 10-variant color system with Figma integration, affecting 1.6k files across the codebase. BikeCenter's entire component library was built from scratch using React, TypeScript, and SCSS—no third-party UI frameworks.",
      p4: "Improving internal APIs and establishing developer experience patterns across the team were another focus. As a trusted decision-maker for UX and technical feasibility, I bridged design and engineering, collaborating with designers as both implementer and advisor.",
      p5: "Mentoring junior developers through pair programming and code reviews was another key part of the role. I established technical standards and conventions across the team, including translation guidelines, BEM naming, and TypeScript best practices, and served as a technical hub between management, backend, and frontend teams."
    },
    divaE: {
      company: "diva-e",
      position: "Junior Frontend Developer",
      period: "2020",
      description:
        "I contributed to a major e-commerce platform at a digital agency, and built an internal social platform using React, GraphQL (Apollo), and SCSS. I also created onboarding documentation for the company's proprietary framework. This role started right as COVID-19 hit, so I successfully navigated the transition to fully remote work."
    },
    campudus: {
      company: "Campudus",
      position: "Intern",
      period: "2019–2020",
      description:
        "I built a fullstack accessories ordering application from scratch—design, architecture, backend, and frontend—during a 3-month internship at DealerCenter Digital's sister company."
    }
  },
  projects: {
    intro:
      "Projects are never finished, but they are always in progress. Here are some of my projects as a developer.",
    blackAtom: {
      description1:
        "Open-source cross-platform theming system generating 27+ cohesive themes from a single source.",
      description2:
        "Built with an adapter pattern for consistent theme generation from a central source using OKLCH color space.",
      description3:
        "Maintained with focus on developer experience and cross-platform consistency."
    },
    awdcs: {
      description1:
        "AWDCS (App, Workspace, Document, Change, Symbol): A scope-based keymap architecture for modal editors organizing bindings by operational context rather than tool-specific functions.",
      description2:
        "Features systematic prefix patterns and semantic naming for consistent, memorable keybindings across workflows."
    },
    koyo: {
      description:
        "Custom QMK keyboard layout for 36-key split keyboards featuring vim-inspired navigation, smart layer design, and comprehensive CLI tooling for Moonlander and Corne keyboards."
    },
    nbrNvim: {
      description:
        "Highly customized Neovim setup for frontend development featuring AWDCS-based keymaps, Lazy.nvim plugin management, and workflows tailored for React and TypeScript."
    }
  },
  connect: {
    title: "Connect",
    github: "GitHub:",
    linkedin: "LinkedIn:",
    cv: "CV:",
    email: "Email:",
    downloadPdf: "Download PDF"
  },
  devStack: {
    technologies: "Technologies",
    devTools: "Dev Tools",
    ai: "AI",
    workflowInfo:
      "I am very passionate about workflow. You can check my <link>dotfiles here</link>.",
    aiIntro:
      "Entering the industry before AI became a thing meant climbing the learning hill with no tab completion or ChatGPT.",
    aiLearning:
      "That foundation was invaluable—and still is in the AI era. For juniors, AI shines as a teacher and reading partner for interactive learning, but not as a writing partner during the early phases. Without learning this craft the hard way first, I couldn't use AI as effectively as I do now.",
    aiLimitsInfo:
      "The technology is fascinating, but it has real limits. Relying too heavily on it means actively unlearning skills and knowledge — <highlight>and maybe most importantly, losing the fun</highlight>.",
    aiUsage:
      "That's why I'm deliberate about how I use it. I use <link>Claude Code</link> as my primary AI assistant. When the task feels manageable by AI code generation, I work out detailed plans and then let <link>Claude Code</link> handle the implementation, while reviewing the code step by step.",
    mcps: "MCP's",
    mcpsIntro: "I also use personal slash commands and MCP's where applicable.",
    mcpsUsed: "These are the most used MCP's for AI assistance.",
    docLookup: "Documentation Lookup",
    webSearch: "Better Web Search",
    browser: "Browser",
    editor: "Editor:",
    terminal: "Terminal:",
    git: "Git:",
    aiAssistant: "AI assistant:",
    secrets: "Secrets:"
  }
} as const;
