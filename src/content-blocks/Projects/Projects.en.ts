export const texts = {
  intro: "Personal projects I actively maintain and evolve.",
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
} as const;
