# Dependency Upgrade Skills — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a global scaffolder skill and use it to generate a project-specific dependency upgrade skill for nbr.haus, then use that skill to handle the open Dependabot PRs.

**Architecture:** Two skills — a global `setup-dep-upgrade-skill` (interactive scaffolder) and a generated project-level `dep-upgrades` skill (upgrade workflow). The scaffolder detects the ecosystem and asks targeted questions before generating the project skill.

**Tech Stack:** Claude Code skills (SKILL.md format), npm ecosystem for nbr.haus

---

## Task 1: Create the global scaffolder skill

**Files:**

- Create: `~/.claude/skills/setup-dep-upgrade-skill/SKILL.md`

**Step 1: Write the SKILL.md**

Write the global skill to `~/.claude/skills/setup-dep-upgrade-skill/SKILL.md` with:

- Frontmatter: `name: setup-dep-upgrade-skill`, description starting with "Use when..."
- Detection phase: check for package.json, go.mod, Cargo.toml, pyproject.toml, etc.
- Detection of scripts (from package.json scripts, Makefile, etc.)
- Detection of Dependabot/Renovate config
- Detection of commit style from recent git log
- Questions phase (3 questions): verification command, additional verification, commit style confirmation
- Output: generates `.claude/skills/dep-upgrades/SKILL.md` with ecosystem-specific content

The generated skill template should include:

- Survey step (ecosystem-specific outdated command + Dependabot PR check)
- Strategy selection (ask user each time)
- Per-upgrade checklist (changelog, usage check, upgrade, verify, report, commit)
- Summary step

**Step 2: Verify the skill file exists and is well-formed**

Run: `cat ~/.claude/skills/setup-dep-upgrade-skill/SKILL.md | head -5`
Expected: YAML frontmatter with name and description

**Step 3: Commit**

```bash
cd ~/.claude && git add skills/setup-dep-upgrade-skill/SKILL.md
git commit -m "feat: add setup-dep-upgrade-skill global scaffolder"
```

---

## Task 2: Test the scaffolder by running it in nbr.haus

**Step 1: Invoke the skill**

Run `/setup-dep-upgrade-skill` in the nbr.haus project directory. This should:

- Detect npm (package.json exists)
- Find `npm run check` as verification command
- Detect Storybook from scripts
- Detect conventional commits from git log
- Ask 3 confirmation questions
- Generate `.claude/skills/dep-upgrades/SKILL.md`

**Step 2: Verify the generated skill**

Read the generated `.claude/skills/dep-upgrades/SKILL.md` and verify:

- It references `npm outdated` (not `go list` or `cargo`)
- It references `npm run check` as verification
- It mentions Storybook if detected
- It uses conventional commit format
- The workflow matches the design doc

**Step 3: Adjust the scaffolder if needed**

If the generated output has issues, fix the scaffolder template and re-generate.

**Step 4: Commit the generated project skill**

```bash
git add .claude/skills/dep-upgrades/SKILL.md
git commit -m "feat: add dep-upgrades project skill"
```

---

## Task 3: Use the generated skill to handle Dependabot PRs

**Step 1: Invoke the skill**

Run `/dep-upgrades` — this should:

- Run `npm outdated` to survey
- List Dependabot PRs (#25 @types/node, #26 shiki)
- Present the summary table
- Ask for strategy

**Step 2: Process each upgrade following the skill's checklist**

For each dep (or batch, depending on chosen strategy):

1. Check changelog/release notes
2. Check usage in project
3. Merge the Dependabot PR (or upgrade manually)
4. Run `npm run check`
5. Report findings
6. Commit if needed

**Step 3: Present summary**

List what was upgraded, any deprecation warnings, new features worth exploring.
