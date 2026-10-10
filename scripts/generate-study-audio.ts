import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

import { STUDY_VOICES, studyAudioPath } from "../src/lib/study/voices.ts";
import { audioHash, MODEL_ID, speechText, withAudioHash } from "./study-audio.ts";

/** Eleven v4's limit for a single request */
const MAX_CHARACTERS = 10_000;

/** Evens out the voice: a compressor narrows its dynamics, then loudnorm sets the overall level */
const MASTERING = {
  /** Level in dB above which the compressor starts reducing gain; lower catches more of the voice */
  threshold: -24,
  /** How strongly gain above the threshold is reduced (3 means 3 dB in for 1 dB out) */
  ratio: 3,
  /** Milliseconds until the compressor reacts; longer lets consonants through untouched */
  attack: 30,
  /** Milliseconds until gain recovers; longer moves slower and avoids audible pumping */
  release: 400,
  /** Integrated loudness target in LUFS; spoken-word platforms aim near -16 */
  loudness: -16,
  /** Ceiling for true peaks in dBTP, headroom for the MP3 encode */
  truePeak: -1.5
};

const MASTERING_FILTER = [
  `acompressor=threshold=${MASTERING.threshold}dB:ratio=${MASTERING.ratio}:attack=${MASTERING.attack}:release=${MASTERING.release}:makeup=2`,
  `loudnorm=I=${MASTERING.loudness}:LRA=7:TP=${MASTERING.truePeak}`
].join(",");

const [slug, onlyVoice] = process.argv.slice(2);
if (!slug) throw new Error("Usage: npm run generate:audio -- <slug> [voice]");

const postPath = `src/content/study/${slug}.en.md`;
const file = await readFile(postPath, "utf8");
const text = speechText(file);
const client = new ElevenLabsClient();

await mkdir("public/audio", { recursive: true });

const voices = onlyVoice
  ? STUDY_VOICES.filter(voice => voice.id === onlyVoice)
  : STUDY_VOICES;
if (voices.length === 0) throw new Error(`No voice "${onlyVoice}" in STUDY_VOICES`);

for (const voice of voices) {
  // A tag at the start fades after a minute or two; repeating it per paragraph holds the delivery
  const tagged = voice.deliveryTag
    ? text
        .split("\n\n")
        .map(paragraph => `${voice.deliveryTag} ${paragraph}`)
        .join("\n\n")
    : text;
  if (tagged.length > MAX_CHARACTERS) {
    throw new Error(
      `${voice.label}: ${tagged.length} characters exceed the ${MAX_CHARACTERS} a single request takes`
    );
  }

  console.log(`${voice.label}: ${tagged.length} characters`);

  const data = await client.textToDialogue.convert({
    inputs: [{ text: tagged, voiceId: voice.voiceId }],
    modelId: MODEL_ID,
    settings: voice.settings
  });

  const outPath = `public${studyAudioPath(slug, voice.id)}`;
  await writeFile(
    outPath,
    master(Buffer.from(await new Response(data).arrayBuffer()))
  );
  console.log(`Wrote ${outPath}`);
}

// The hash marks every voice as current, so a single-voice run leaves it alone
if (!onlyVoice) await writeFile(postPath, withAudioHash(file, audioHash(file)));

function master(mp3: Buffer): Buffer {
  const result = spawnSync(
    "ffmpeg",
    [
      "-i",
      "pipe:0",
      "-af",
      MASTERING_FILTER,
      "-codec:a",
      "libmp3lame",
      "-b:a",
      "128k",
      "-f",
      "mp3",
      "pipe:1"
    ],
    { input: mp3, maxBuffer: 64 * 1024 * 1024 }
  );
  if (result.status !== 0)
    throw new Error(`ffmpeg failed: ${result.stderr.toString()}`);
  return result.stdout;
}
