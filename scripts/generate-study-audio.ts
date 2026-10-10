import { mkdir, readFile, writeFile } from "node:fs/promises";

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

import { STUDY_VOICES, studyAudioPath } from "../src/lib/study/voices.ts";
import { audioHash, MODEL_ID, speechText, withAudioHash } from "./study-audio.ts";

/** Text to Dialogue generates reliably up to about 2,000 characters per request */
const MAX_CHUNK = 2000;

const slug = process.argv[2];
if (!slug) throw new Error("Usage: npm run generate:audio -- <slug>");

const postPath = `src/content/study/${slug}.en.md`;
const file = await readFile(postPath, "utf8");
const chunks = toChunks(speechText(file));
const client = new ElevenLabsClient();

await mkdir("public/audio", { recursive: true });

for (const voice of STUDY_VOICES) {
  const parts: Uint8Array[] = [];
  const requestIds: string[] = [];

  for (const [index, text] of chunks.entries()) {
    console.log(
      `${voice.label}: chunk ${index + 1}/${chunks.length} (${text.length} characters)`
    );

    const { data, rawResponse } = await client.textToDialogue
      .convert({
        inputs: [
          {
            text: voice.deliveryTag ? `${voice.deliveryTag} ${text}` : text,
            voiceId: voice.voiceId
          }
        ],
        modelId: MODEL_ID,
        settings: voice.settings,
        previousRequestIds: requestIds.slice(-3)
      })
      .withRawResponse();

    parts.push(new Uint8Array(await new Response(data).arrayBuffer()));

    const requestId = rawResponse.headers.get("request-id");
    if (requestId) requestIds.push(requestId);
  }

  const outPath = `public${studyAudioPath(slug, voice.id)}`;
  await writeFile(outPath, Buffer.concat(parts));
  console.log(`Wrote ${outPath}`);
}

await writeFile(postPath, withAudioHash(file, audioHash(file)));

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
