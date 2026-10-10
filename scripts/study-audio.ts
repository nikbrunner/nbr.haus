import { createHash } from "node:crypto";

import matter from "gray-matter";

import { splitSources } from "../src/lib/study/sources.ts";

export const MODEL_ID = "eleven_v4";
export const VOICE_ID = "mR8Q4qbqeyA2XzNH6Es4";

const FRONTMATTER_END = /^---$/m;
const AUDIO_LINE = /^audio: .*\n/m;

/** The text that gets read aloud: title, subtitle and body, without footnotes or Markdown syntax */
export function speechText(file: string): string {
  const { data, content } = matter(file);
  const title = data.subtitle
    ? `${data.title}. ${data.subtitle}.`
    : `${data.title}.`;
  const body = splitSources(content)
    .body.replace(/\[\d+\]\(#source-\d+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s+(.+)$/gm, "$1.")
    .replace(/[_*]/g, "")
    .replace(/(?<!\n)\n(?!\n)/g, " ")
    .trim();

  return `${title}\n\n${body}`;
}

/** Changes whenever the spoken text, the voice or the model changes */
export function audioHash(file: string): string {
  return createHash("sha256")
    .update(`${MODEL_ID}\n${VOICE_ID}\n${speechText(file)}`)
    .digest("hex")
    .slice(0, 12);
}

/** Sets the frontmatter `audio` field, which records the hash the audio file was generated from */
export function withAudioHash(file: string, hash: string): string {
  const withoutAudio = file.replace(AUDIO_LINE, "");
  const end = FRONTMATTER_END.exec(withoutAudio.slice(3));
  if (!end) throw new Error("Post has no frontmatter");

  const insertAt = 3 + end.index;
  return `${withoutAudio.slice(0, insertAt)}audio: "${hash}"\n${withoutAudio.slice(insertAt)}`;
}
