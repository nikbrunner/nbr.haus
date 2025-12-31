import type { texts as sharedTexts } from "@/texts/domains/shared.en";

/** Breakpoint for mobile-specific behavior (panel auto-close, stacked layout) */
export const MOBILE_BREAKPOINT = 768;

interface SectionConfig {
  /** Section anchor ID (without #) */
  id: string;
  /** Key into t.shared.sections */
  labelKey: keyof typeof sharedTexts.sections;
}

/**
 * Route-to-sections mapping for ControlPanel navigation.
 * Section IDs must match the id attributes on Section components in each route.
 */
export const routeSectionsConfig: Record<string, SectionConfig[]> = {
  "/": [
    { id: "connect", labelKey: "connect" },
    { id: "about", labelKey: "about" },
    { id: "employment", labelKey: "employment" },
    { id: "projects", labelKey: "projects" }
  ],
  "/cv": [
    { id: "work-experience", labelKey: "workExperience" },
    { id: "side-projects", labelKey: "sideProjects" },
    { id: "technical-skills", labelKey: "technicalSkills" },
    { id: "prior-experience", labelKey: "priorExperience" },
    { id: "education", labelKey: "education" },
    { id: "interests", labelKey: "interests" }
  ]
};
