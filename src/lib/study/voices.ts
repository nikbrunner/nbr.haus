import type { AudioTrack } from "@/lib/audio";
import type { StudyFrontmatter } from "@/lib/study/types";

/** ElevenLabs voice IDs, by the voice's name in the ElevenLabs account */
const ElevenLabsVoice = {
  /** Nik's own instant clone ("Nik v2" in ElevenLabs) */
  NikV2: "QrIGhZnCwRcWI8hIDflQ"
} as const;

interface StudyVoice {
  /** Used in file names and as the remembered choice: `public/audio/<slug>.<id>.mp3` */
  id: string;
  label: string;
  voiceId: (typeof ElevenLabsVoice)[keyof typeof ElevenLabsVoice];
  /** Audio tag prefixed to every paragraph */
  deliveryTag?: string;
  settings?: { similarity?: number; stability?: number };
}

/** Every voice a post's audio is generated in; the first is the default */
export const STUDY_VOICES: StudyVoice[] = [
  {
    id: "nik",
    label: "Nik",
    voiceId: ElevenLabsVoice.NikV2,
    // The clone drifts toward a British accent: lower similarity lets the tag outweigh
    // the recorded sample, lower stability lets the delivery follow it
    deliveryTag: "[strong American accent]",
    settings: { similarity: 0.4, stability: 0.3 }
  }
];

export function studyAudioPath(slug: string, voiceId: string): string {
  return `/audio/${slug}.${voiceId}.mp3`;
}

/** The player's track for a post or a page's spoken version, or null when it has no narration yet */
export function studyAudioTrack(post: {
  slug: string;
  frontmatter: Pick<StudyFrontmatter, "title" | "audio">;
}): AudioTrack | null {
  const { title, audio } = post.frontmatter;
  if (!audio) return null;
  return {
    id: post.slug,
    title,
    voices: STUDY_VOICES.map(voice => ({
      id: voice.id,
      label: voice.label,
      src: `${studyAudioPath(post.slug, voice.id)}?v=${audio}`
    }))
  };
}
