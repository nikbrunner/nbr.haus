import { texts as about } from "@/texts/domains/about.en";
import { texts as connect } from "@/texts/domains/connect.en";
import { texts as controlPanel } from "@/texts/domains/controlPanel.en";
import { texts as cv } from "@/texts/domains/cv.en";
import { texts as jobs } from "@/texts/domains/jobs.en";
import { texts as projects } from "@/texts/domains/projects.en";
import { texts as shared } from "@/texts/domains/shared.en";
import { texts as study } from "@/texts/domains/study.en";

export const en = {
  shared,
  jobs,
  projects,
  about,
  connect,
  cv,
  controlPanel,
  study
} as const;

export type Texts = typeof en;
