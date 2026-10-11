---
name: repo-sync-home
description: "Bring the spoken home page, the curl card and the home audio in line with a change to the home page."
disable-model-invocation: true
allowed-tools: Bash Read Edit Skill
---

# Sync the home page

The home page reads its text from `src/routes/index.tsx` and `src/config.ts`. Two copies of it follow it: the spoken
version `src/content/pages/home.en.md` and the curl card `server/middleware/curl.ts`. The audio follows the spoken
version.

## 1. Find the change

Diff the two page sources against the last commit that touched the spoken version:

```sh
base=$(git log -1 --format=%H -- src/content/pages/home.en.md)
git diff "$base" -- src/routes/index.tsx src/config.ts
```

List every change a visitor reads: copy, jobs, pins, projects, dates. Markup, styling and code-only changes drop out.
Done when each visitor-facing change is on the list, or the list is empty and you say so and stop.

## 2. Update the spoken version

Edit the matching passages of `home.en.md` with the `humanizer` skill: Nik's voice, spoken prose, and only facts the page
states. Where the page wording is ambiguous, pick the reading that claims less and name the choice to Nik. Keep the
frontmatter, including `audio`, unchanged. Done when every item from step 1 is reflected in the prose.

## 3. Check the curl card

Run the curl card check from `repo-commit` §3 and fix any item that no longer matches the page.

## 4. Report the audio

```sh
node scripts/check-study-audio.ts src/content/pages/home.en.md
```

Generation is billed, so show Nik the prose diff and wait for his approval of the text before running
`npm run generate:audio -- home` (`docs/content.md`, Audio).
