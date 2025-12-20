export const tech = {
  // Languages
  typescript: {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    color: "#3178c6"
  },
  javascript: {
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    color: "#f7df1e"
  },
  lua: {
    name: "Lua",
    url: "https://www.lua.org",
    color: "#000080"
  },
  c: {
    name: "C",
    url: "https://en.cppreference.com/w/c",
    color: "#555555"
  },
  bash: {
    name: "Bash",
    url: "https://www.gnu.org/software/bash/",
    color: "#4eaa25"
  },
  markdown: {
    name: "Markdown",
    url: "https://www.markdownguide.org",
    color: "#083fa1"
  },

  // Frameworks & Libraries
  react: {
    name: "React",
    url: "https://react.dev",
    color: "#61dafb"
  },
  redux: {
    name: "Redux (Toolkit)",
    url: "https://redux-toolkit.js.org",
    color: "#764abc"
  },
  electron: {
    name: "Electron",
    url: "https://www.electronjs.org",
    color: "#47848f"
  },
  nodejs: {
    name: "Node.js",
    url: "https://nodejs.org",
    color: "#339933"
  },
  deno: {
    name: "Deno",
    url: "https://deno.land",
    color: "#70ffaf"
  },

  // TanStack
  tanstackStart: {
    name: "TanStack Start",
    url: "https://tanstack.com/start",
    color: "#ff4154"
  },
  tanstackRouter: {
    name: "TanStack Router",
    url: "https://tanstack.com/router",
    color: "#ff4154"
  },
  tanstackQuery: {
    name: "TanStack Query",
    url: "https://tanstack.com/query",
    color: "#ff4154"
  },
  tanstackForm: {
    name: "TanStack Form",
    url: "https://tanstack.com/form",
    color: "#ff4154"
  },

  // Styling
  scss: {
    name: "SCSS",
    url: "https://sass-lang.com",
    color: "#cc6699"
  },
  tailwind: {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    color: "#06b6d4"
  },
  shadcn: {
    name: "ShadCN",
    url: "https://ui.shadcn.com",
    color: "#000000"
  },

  // Data & APIs
  graphql: {
    name: "GraphQL",
    url: "https://graphql.org",
    color: "#e10098"
  },

  // Tools
  storybook: {
    name: "Storybook",
    url: "https://storybook.js.org",
    color: "#ff4785"
  },
  neovim: {
    name: "Neovim",
    url: "https://neovim.io",
    color: "#57a143"
  },
  qmk: {
    name: "QMK",
    url: "https://qmk.fm",
    color: "#5c5c5c"
  },

  // Concepts & Other
  oklch: {
    name: "OKLCH",
    url: "https://oklch.com",
    color: "#6366f1"
  }
} as const;

export type Tech = (typeof tech)[keyof typeof tech];
