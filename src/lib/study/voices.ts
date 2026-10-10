/** ElevenLabs voice IDs, by the voice's name in the ElevenLabs account */
const ElevenLabsVoice = {
  /** Nik's own instant clone ("Nik v2" in ElevenLabs) */
  NikV2: "QrIGhZnCwRcWI8hIDflQ",
  /** Sadie, from the ElevenLabs voice library */
  Sadie: "bD9maNcCuQQS75DGuteM"
} as const;

interface StudyVoice {
  /** Used in file names and as the remembered choice: `public/audio/<slug>.<id>.mp3` */
  id: string;
  label: string;
  voiceId: (typeof ElevenLabsVoice)[keyof typeof ElevenLabsVoice];
  /** Audio tag prefixed to every generated chunk */
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
  },
  {
    id: "sadie",
    label: "Sadie",
    voiceId: ElevenLabsVoice.Sadie
  }
];

export function studyAudioPath(slug: string, voiceId: string): string {
  return `/audio/${slug}.${voiceId}.mp3`;
}
