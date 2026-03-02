# Dependency Upgrade Skills Design

## Overview

Two skills that work together to create a reusable dependency upgrade workflow across projects.

## Skill 1: `setup-dep-upgrade-skill` (Global)

**Location:** `~/.claude/skills/setup-dep-upgrade-skill/SKILL.md`
**Purpose:** Invoked in any project repo to scaffold a project-specific `dep-upgrades` skill.

### Detection Phase (automatic)

Gathers context without user input:

- Package manager (package.json → npm/pnpm/bun, go.mod → Go, Cargo.toml → Rust, etc.)
- Lock file presence
- Existing check/test/build commands from project config (scripts in package.json, Makefile targets, etc.)
- Dependabot/Renovate config if present
- CLAUDE.md for any project-specific verification commands
- CI config if present

### Questions Phase (3 questions max)

1. **Verification command(s)** — pre-detected from scripts, confirm or override (e.g., `npm run check`, `go test ./...`)
2. **Additional verification** — Storybook, E2E tests, anything beyond the standard check?
3. **Commit style** — conventional commits? Auto-detected from recent git history, confirm.

### Output

Writes `.claude/skills/dep-upgrades/SKILL.md` to the project, tailored to the detected ecosystem.

---

## Skill 2: `dep-upgrades` (Project-level, generated)

**Location:** `<project>/.claude/skills/dep-upgrades/SKILL.md`
**Purpose:** Handle dependency upgrades with a consistent, safe workflow.
**Arguments:** Optional package name(s) to upgrade, or empty to review all.

### Workflow

#### 1. Survey

- Run the ecosystem's outdated command (e.g., `npm outdated`, `go list -m -u all`)
- If Dependabot PRs exist, list them via `gh pr list --author "app/dependabot"`
- Present a summary table: package, current, latest, bump type (patch/minor/major)

#### 2. Strategy Selection

Ask the user which approach for this session:

- **Batch patches/minors, majors one-by-one** — group low-risk, isolate high-risk
- **All one-by-one** — safest, for cautious upgrades
- **All at once** — fast, for when you're confident

#### 3. Per-Upgrade Checklist

Repeated for each dependency or batch:

1. **Check changelog/release notes** — use Exa/WebSearch to find the release page, summarize breaking changes, deprecations, and notable new features relevant to the project
2. **Check usage in project** — Grep for imports/usage to understand blast radius
3. **Upgrade** — run the upgrade command
4. **Verify** — run the project's verification command(s)
5. **Report** — summarize changes, deprecation warnings, new features worth adopting
6. **Commit** — one commit per upgrade/batch, conventional commit format

#### 4. Summary

After all upgrades:

- What was upgraded (with versions)
- Deprecation warnings to address later
- New features worth exploring
- Deps that were skipped and why

---

## Design Decisions

- **Scaffolder + project skill** (not a single global skill) — project skills encode project-specific context (test commands, Storybook, etc.) and evolve with the project
- **Unified workflow** — same checklist whether triggered by Dependabot PR review or manual upgrade
- **User chooses strategy each time** — no hardcoded default; the right strategy depends on the situation
- **Changelog research is mandatory** — major bumps without reading release notes is how things break
