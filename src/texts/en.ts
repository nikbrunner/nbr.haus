import { texts as about } from "./domains/about.en";
import { texts as connect } from "./domains/connect.en";
import { texts as cv } from "./domains/cv.en";
import { texts as jobs } from "./domains/jobs.en";
import { texts as projects } from "./domains/projects.en";
import { texts as shared } from "./domains/shared.en";

export const en = {
  shared,
  jobs,
  projects,
  about,
  connect,
  cv
} as const;

export type Texts = typeof en;
