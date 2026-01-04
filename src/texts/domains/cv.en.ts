import { texts as jobsTexts } from "@/texts/domains/jobs.en";
import { texts as projectsTexts } from "@/texts/domains/projects.en";

export const texts = {
  tagline:
    "Software Engineer specializing in Frontend Development with {years} years of experience building modern web and desktop applications",

  summary:
    "Specialized in design systems, frontend architecture, and large-scale migrations. Led technical decisions affecting thousands of files and mentored junior developers. Comfortable working independently while thriving in collaborative teams. Integrates AI tooling into daily development workflows.",

  contact: {
    location: "Landshut, Germany",
    website: "https://nbr.haus",
    email: "nik@nbr.haus",
    github: "github.com/nikbrunner",
    linkedin: "linkedin.com/in/nbru"
  },

  languages: "German (Native) • English (Fluent)",

  // Jobs with shared metadata, CV-specific descriptions (third person)
  jobs: {
    dealerCenter: {
      company: jobsTexts.dealerCenter.company,
      position: jobsTexts.dealerCenter.position,
      period: jobsTexts.dealerCenter.period,
      location: jobsTexts.dealerCenter.location,
      intro:
        "BikeCenter is an Electron-based point-of-sale application used by hundreds of bike retailers across Germany. Joined as a junior and grew into a frontend lead role, owning architecture decisions, managing frontend priorities, and mentoring newer team members.",
      bullets: [
        "Led frontend architecture for BikeCenter (Electron/React application), building and maintaining its custom design system",
        "Led large-scale framework migrations affecting 1600+ files (Redux → TanStack Query, React Router → TanStack Start)",
        "Mentored junior developers and established & documented frontend coding standards",
        "Architected modern GraphQL-based Vendure storefront and coordinated between design and backend teams",
        "Implemented component testing with Jest and Storybook snapshots",
        "Integrated external services including analytics (Mixpanel), leasing calculators, and third-party product advisers"
      ],
      technologies: [
        "React",
        "TypeScript",
        "SCSS",
        "Storybook",
        "TanStack Router",
        "TanStack Query",
        "TanStack Form",
        "Redux",
        "GraphQL",
        "Tailwind",
        "Electron",
        "Node.js"
      ]
    },
    divaE: {
      company: jobsTexts.divaE.company,
      position: jobsTexts.divaE.position,
      period: jobsTexts.divaE.period,
      location: jobsTexts.divaE.location,
      description:
        "Contributed to a major e-commerce platform and built an internal social platform using React, GraphQL (Apollo), and SCSS. Moved to DealerCenter Digital for an opportunity better aligned with personal goals.",
      technologies: ["React", "TypeScript", "SCSS", "Node.js"]
    },
    campudus: {
      company: jobsTexts.campudus.company,
      position: jobsTexts.campudus.position,
      period: jobsTexts.campudus.period,
      location: jobsTexts.campudus.location,
      description:
        "Built a fullstack accessories ordering application from scratch — design, architecture, backend, and frontend — during a 3-month internship at DealerCenter Digital's sister company.",
      technologies: ["React", "Node.js"]
    }
  },

  // Projects with shared metadata
  projects: {
    blackAtom: {
      title: projectsTexts.blackAtom.title,
      subtitle: projectsTexts.blackAtom.subtitle,
      bullets: projectsTexts.blackAtom.bullets
    },
    awdcs: {
      title: projectsTexts.awdcs.title,
      subtitle: projectsTexts.awdcs.subtitle,
      bullets: projectsTexts.awdcs.bullets
    },
    koyo: {
      title: projectsTexts.koyo.title,
      subtitle: projectsTexts.koyo.subtitle,
      bullets: projectsTexts.koyo.bullets
    }
  },

  priorExperience: {
    title: "Event Technology & Audio Engineering (2011–2019)",
    description:
      "Extensive background in event technology, professional sound engineering, and photography. Worked at five-star hotels and premium studios, developing strong problem-solving and client communication skills."
  },

  education: "Sound Engineering & Mastering, Deutsche Pop Munich (2010–2011)",

  interests:
    "Hiking, Running, Bouldering, Cooking, Reading, Photography, All forms of Design"
} as const;
