export interface CoverLetterFrontmatter {
  company: string;
  recipient: string;
  recipientTitle?: string;
  date: string; // YYYY-MM-DD
  position: string;
  draft?: boolean;
}

export interface CoverLetter {
  slug: string;
  frontmatter: CoverLetterFrontmatter;
  content: string;
}
