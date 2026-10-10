import { mkdir, readFile, writeFile } from "node:fs/promises";

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

import {
  audioHash,
  MODEL_ID,
  speechText,
  VOICE_ID,
  withAudioHash
} from "./study-audio.ts";

/** Text to Dialogue generates reliably up to about 2,000 characters per request */
const MAX_CHUNK = 2000;

const slug = process.argv[2];
if (!slug) throw new Error("Usage: npm run generate:audio -- <slug>");
if (!VOICE_ID) throw new Error("Set VOICE_ID in scripts/study-audio.ts");

const postPath = `src/content/study/${slug}.en.md`;
const file = await readFile(postPath, "utf8");
const chunks = toChunks(speechText(file));

const client = new ElevenLabsClient();
const parts: Uint8Array[] = [];
const requestIds: string[] = [];

for (const [index, text] of chunks.entries()) {
  console.log(
    `Generating chunk ${index + 1}/${chunks.length} (${text.length} characters)`
  );

  const { data, rawResponse } = await client.textToDialogue
    .convert({
      inputs: [{ text, voiceId: VOICE_ID }],
      modelId: MODEL_ID,
      previousRequestIds: requestIds.slice(-3)
    })
    .withRawResponse();

  parts.push(new Uint8Array(await new Response(data).arrayBuffer()));

  const requestId = rawResponse.headers.get("request-id");
  if (requestId) requestIds.push(requestId);
}

await mkdir("public/audio", { recursive: true });
await writeFile(`public/audio/${slug}.mp3`, Buffer.concat(parts));
await writeFile(postPath, withAudioHash(file, audioHash(file)));

console.log(`Wrote public/audio/${slug}.mp3`);

/** Packs paragraphs into chunks, splitting a paragraph at sentence ends only when it alone is too long */
function toChunks(text: string): string[] {
  const pieces = text
    .split(/\n{2,}/)
    .flatMap(paragraph =>
      paragraph.length <= MAX_CHUNK ? [paragraph] : paragraph.split(/(?<=[.!?])\s+/)
    );

  const chunks: string[] = [];
  let current = "";

  for (const piece of pieces) {
    const next = current ? `${current}\n\n${piece}` : piece;
    if (next.length > MAX_CHUNK && current) {
      chunks.push(current);
      current = piece;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);

  return chunks;
}
