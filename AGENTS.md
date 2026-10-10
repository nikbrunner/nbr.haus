# nbr.haus

Personal portfolio — TanStack Start, React 19, TypeScript, CSS with BEM.

See `docs/` for architecture, styling, content, and testing guides.

Components live in `src/components/`: props in, co-located BEM CSS (imported in `src/styles/global.css`) and a story each. `src/partials/` composes them without styling; `src/routes/` holds data and copy.
TanStack Router docs: `docs/ai/tanstack-router.md` (read when working on routing).

Study posts (`src/content/study/`) are Nik's essays, written in his own voice, and each one has narrated audio from ElevenLabs (`docs/content.md`, Audio). Every generation is billed: while text or audio settings are still changing, generate the `nik` voice only and run all voices once Nik approves.

Adding, changing or removing a feature updates its Playwright tests in the same change: `e2e/*.spec.ts` for behaviour a visitor sees (keys, navigation, audio), `*.browser.test.ts` for layout and focus logic. `npm run test:e2e` runs before every push.
