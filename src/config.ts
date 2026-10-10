export const GITHUB_USER = "nikbrunner";

export interface Pin {
  repo: string;
  name: string;
  href: string;
  description: string;
}

export const pins: Pin[] = [
  {
    repo: "black-atom-industries/black-atom",
    name: "black-atom",
    href: "https://black-atom.industries/",
    description:
      "One set of color themes for every tool I use, from editor to terminal. A small app switches all of them at once, light or dark."
  },
  {
    repo: "nikbrunner/lazyjira",
    name: "lazyjira",
    href: "https://github.com/nikbrunner/lazyjira",
    description: "Keyboard-driven terminal UI for Jira, in the spirit of lazygit."
  },
  {
    repo: "nikbrunner/koyo",
    name: "koyo",
    href: "https://github.com/nikbrunner/koyo",
    description: "Split keyboard layout for QMK, with a small CLI."
  }
];

interface Job {
  period: [string, string];
  company: string;
  href: string;
  role: string;
  notes: string;
}

export const jobs: Job[] = [
  {
    period: ["2020-09", "2026-01"],
    company: "DealerCenter Digital",
    href: "https://www.bike.center/",
    role: "Software Engineer, Frontend Lead",
    notes:
      "Electron app used by hundreds of bike retailers. Built the component library and color system from scratch, moved the team to TanStack Query and Redux Toolkit, rebuilt the storefront on TanStack Start, mentored juniors."
  },
  {
    period: ["2020-03", "2020-09"],
    company: "diva-e",
    href: "https://www.diva-e.com/de/",
    role: "Junior Frontend Developer",
    notes: "E-commerce platform and an internal social app. React, GraphQL, SCSS."
  },
  {
    period: ["2019-12", "2020-02"],
    company: "Campudus",
    href: "https://www.campudus.com/",
    role: "Intern",
    notes: "An ordering app, built alone from design to backend."
  }
];

export const moreProjects = [
  { name: "lager", href: "https://github.com/nikbrunner/lager" },
  { name: "mdn.nvim", href: "https://github.com/nikbrunner/mdn.nvim" },
  {
    name: "helm.herdr",
    href: "https://github.com/black-atom-industries/helm.herdr"
  },
  { name: "dots", href: "https://github.com/nikbrunner/dots" }
];

/** Repositories whose commits feed the log, as owner/name */
export const logRepos = [
  "nikbrunner/nbr.haus",
  "nikbrunner/dots",
  "black-atom-industries/black-atom",
  "nikbrunner/lazyjira",
  "nikbrunner/lager",
  "nikbrunner/mdn.nvim",
  "nikbrunner/koyo",
  "black-atom-industries/helm.herdr"
];
