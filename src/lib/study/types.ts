export const STUDY_TAGS = [
  "code",
  "philosophy",
  "tools",
  "career",
  "learning"
] as const;

export type StudyTag = (typeof STUDY_TAGS)[number];

export interface StudyFrontmatter {
  title: string;
  subtitle?: string;
  publishedAt: string; // YYYY-MM-DD
  excerpt: string;
  tags: StudyTag[];
  draft?: boolean;
}

export interface StudyPost {
  slug: string;
  frontmatter: StudyFrontmatter;
  content: string;
  readingTime: number; // minutes
}

export interface StudyPostMeta {
  slug: string;
  frontmatter: StudyFrontmatter;
  readingTime: number;
}
