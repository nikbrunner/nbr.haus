export const texts = {
  intro: "Personal projects I actively maintain and evolve.",
  blackAtom: {
    title: "Black Atom Industries",
    // Paragraphs for index page
    paragraphs: [
      "Open-source cross-platform theming system generating 27+ cohesive themes from a single source.",
      "Built with an adapter pattern for consistent theme generation from a central source using OKLCH color space.",
      "Maintained with focus on developer experience and cross-platform consistency."
    ],
    // CV format
    subtitle: "Open Source Theming System • Creator & Maintainer",
    bullets: [
      "Created theming system supporting 27+ themes across 6 platforms (Zed, WezTerm, Alacritty, Ghostty, Neovim)",
      "Built with TypeScript, featuring automated theme generation and distribution"
    ]
  },
  awdcs: {
    title: "AWDCS",
    paragraphs: [
      "AWDCS (App, Workspace, Document, Change, Symbol): A scope-based keymap architecture for modal editors organizing bindings by operational context rather than tool-specific functions.",
      "Features systematic prefix patterns and semantic naming for consistent, memorable keybindings across workflows."
    ],
    subtitle: "Modal Editor Keymap Architecture",
    bullets: [
      "Designed scope-based keymap system (App, Workspace, Document, Change, Symbol) for modal editors",
      "Created systematic prefix patterns and semantic naming for consistent, memorable keybindings"
    ]
  },
  koyo: {
    title: "kōyō",
    paragraphs: [
      "Custom QMK keyboard layout for 36-key split keyboards featuring vim-inspired navigation, smart layer design, and comprehensive CLI tooling for Moonlander and Corne keyboards."
    ],
    subtitle: "QMK Keyboard Layout & Firmware",
    bullets: [
      "Custom QMK layout for 36-key split keyboards (Moonlander, Corne) with vim-inspired navigation",
      "Built comprehensive CLI tooling for keyboard configuration and deployment"
    ]
  },
  nbrNvim: {
    title: "nbr.nvim",
    paragraphs: [
      "Highly customized Neovim setup for frontend development featuring AWDCS-based keymaps, Lazy.nvim plugin management, and workflows tailored for React and TypeScript."
    ]
  }
} as const;
