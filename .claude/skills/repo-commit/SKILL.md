---
name: repo-commit
description:
  "Prepare a commit in the nbr.haus repository. Use this when the user asks to commit, stage, ship, or finish a change.
  Stage selectively, check that the curl card still matches the page, run the checks, show the exact Conventional Commit,
  and wait for explicit approval."
argument-hint: "[message-hint or scope-hint, optional]"
allowed-tools: Bash Read
---

# Commit a change

This skill is the commit workflow for this repository. Its sections 3 to 5 hold the repo's docs list, checks, and commit
grammar; global commit workflows read them from here. To sort several changes into commits, use `nbr-git-commit-buckets`.
Commit only after the user approves the final message. Keep unrelated work unstaged and each commit atomic.

## 1. Survey the tree

```sh
git status --short
git diff --stat
git diff --cached --stat
git log --oneline -5
```

Classify paths as **in scope**, **held back**, or **stray**, and surface unexpected edits.

## 2. Stage selectively

Stage named paths or single hunks; leave held-back work in the working tree.

## 3. Audit docs and the curl card

**Docs**: when the staged changes add or change a feature, command, config key, or domain term, check `AGENTS.md`,
`README.md`, and `docs/*.md` against the diff. Fix and stage confirmed docs in the same commit.

**Curl card**: `server/middleware/curl.ts` renders a short plain-text form of the home page for `curl nbr.haus`. It reads
`jobs`, `pins`, and `moreProjects` from `src/config.ts` and holds its own copy of the text it shows. The card is a
selection: sections it leaves out (About, How I work, Log, Study) are fine. When the staged changes touch
`src/routes/index.tsx` or `src/config.ts`, compare every item the card does show with the page: its text, links, and order
must match. A difference is a finding; fix the card in the same commit. Check the result with:

```sh
curl -s -H "User-Agent: curl/8" http://localhost:3000/
```

## 4. Verify

```sh
npm run check
npx vitest run
```

`npm run check` runs oxfmt, ESLint, TypeScript, the story-only check, and knip. The `pre-push` hook runs
`npm run test:e2e`; when the change alters behaviour a visitor sees, run it before committing too. A docs-only change may
skip verification; say that it was skipped. If verification fails, fix the cause, restage, and run it again.

## 5. Draft and ask

Conventional Commits:

```text
<type>(<scope>): <imperative summary>
```

- `feat` for new visitor-facing behaviour, `fix` for a visitor-facing bug, `style` for visual polish without new
  behaviour, `content` for study posts and copy.
- `docs`, `refactor`, `test`, `chore` for the rest. Agent skills and `AGENTS.md` are `chore`. Dependency updates are
  `chore(deps)`.
- The scope is the area, as in recent history: `study`, `storybook`, `deps`. Omit it when the change spans areas.

Keep the subject under 70 characters and describe the outcome, not the file list. Add a short bullet body only when the
change has several moving parts.

Show the in-scope paths, held-back and stray paths, the exact message, the curl card result, and the verification result.
Then ask: **Go-ahead to commit?**

## 6. Commit after approval

```sh
git commit -m "$(cat <<'MSG'
<message>
MSG
)"
```

The `pre-commit` hook warns about stale study audio without blocking. If a hook fails, fix the cause, restage, and make a
new commit attempt. Confirm the new log entry and final status.
