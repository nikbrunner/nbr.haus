# Content

How to add and update content.

## Text

All copy is English and written inline in the routes (`src/routes/*.tsx`). Components receive text via props.

## Projects and Commit Log

`src/config.ts` holds:

- `pins` - the pinned project cards
- `moreProjects` - the "Also" links
- `logRepos` - the repos whose commits feed the log, as `owner/name`

## Study Posts

Study posts are Markdown files with frontmatter in `src/content/study/<slug>.en.md`. `publishedAt` is a `YYYY-MM-DD` date. Posts are loaded by the server functions in `src/lib/study/posts.ts` and served at `/study/<slug>`. A post renders as up to four sections: `00 Record` (published, tags, length, and a Listen player when the post has audio), `01 Text` with each `##` heading numbered 01.1, 01.2 and so on, `02 Sources` when the post has footnotes, and `03 More` linking the neighbouring posts when there are any. Cite with Markdown footnotes (`text.[^key]` plus a `[^key]: Source.` definition): sources are numbered by first reference, and each reference links to its `[n]` entry in `02 Sources`. Cite several sources for one claim in a single footnote, since adjacent references run together. `npm run format` wraps post prose at 80 columns (an `overrides` entry in `.oxfmtrc.json`); a wrapped footnote definition continues on indented lines. Its study number counts posts oldest first.

### Audio

`npm run generate:audio -- <slug>` reads a post aloud with ElevenLabs (`eleven_v4`) once per voice in `src/lib/study/voices.ts` and writes `public/audio/<slug>.<voice>.mp3`. Each voice names its ElevenLabs voice ID through the `ElevenLabsVoice` map and can carry an audio tag and voice settings; the first voice is the default. The script reads the API key from Proton Pass (`ELEVENLABS_API_TOKEN`), generates the spoken text in chunks of about 2,000 characters, and records the text's hash in the post's `audio` frontmatter field. The hash covers the spoken text, the model and every voice with its settings, so frontmatter edits and re-wrapped lines leave it fresh. Generate audio only after the text is final: every run is billed, once per voice.

A post with an `audio` field shows the `AudioPlayer` in `00 Record`: play and pause, a character track to seek, and a voice switch. The chosen voice and each file's position are remembered in localStorage.

The `study audio` pre-commit hook warns, without blocking the commit, when a staged post's audio is missing or out of date. It reads the working tree, so a partially staged post is checked as it is on disk.

## CV

The home page is the CV. Printing it (or the Print button) produces an A4 layout, ink on white, without controls or navigation. The print tokens sit at the end of `src/styles/global.css`; each component handles its own print adjustments.

## Adding a New Route

1. Create a route file in `src/routes/`. A page opens with its own header and the site controls, and closes with its footer:

```tsx
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";

import Colophon from "@/components/Colophon";
import { SiteHeader } from "@/partials/SiteHeader";

export const Route = createFileRoute("/about")({
  component: AboutRoute
});

function AboutRoute() {
  return (
    <>
      <SiteHeader meta={["About", "2026-10-06"]} title={["About"]} />
      <Colophon start="nbr.haus" center="Design via function" end="Page 1 / 1" />
    </>
  );
}
```

2. The route tree regenerates automatically on `npm run dev`.
