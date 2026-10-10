import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";

const pageModules = import.meta.glob<string>("/src/content/pages/*.md", {
  eager: true,
  query: "?raw",
  import: "default"
});

export interface SpokenPage {
  slug: string;
  frontmatter: { title: string; audio?: string };
}

/** The home page's spoken version, read aloud in the media player; null without the file */
export const getSpokenHome = createServerFn({ method: "GET" }).handler(
  async (): Promise<SpokenPage | null> => {
    const file = pageModules["/src/content/pages/home.en.md"] as string | undefined;
    if (!file) return null;
    const { data } = matter(file);
    return { slug: "home", frontmatter: { title: data.title, audio: data.audio } };
  }
);
