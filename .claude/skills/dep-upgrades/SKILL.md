---
name: dep-upgrades
description: Use when upgrading dependencies, reviewing Dependabot/Renovate PRs, or auditing outdated packages in this project.
argument-hint: [package-name|all]
---

# Dependency Upgrades

Upgrade dependencies with changelog review, verification, and safe commits.

## Arguments

`$ARGUMENTS` — optional package name(s) to upgrade. Empty to review all outdated deps.

## Ecosystem

- **Package manager:** npm
- **Lock file:** package-lock.json
- **Outdated command:** `npm outdated`
- **Upgrade command:** `npm install`
- **Verification:** `npm run check && npm run build && npm run test`
- **Extra verification:** `npm run build:storybook` (for UI-related dep upgrades)
- **Commit prefix:** `chore(deps):`
- **Dependabot:** configured (check PRs with `gh pr list --author "app/dependabot"`)

## Workflow

### 1. Survey

```bash
npm outdated
gh pr list --author "app/dependabot" --state open --json number,title,headRefName
```

Present a summary table:

| Package | Current | Latest | Bump | Source |
|---------|---------|--------|------|--------|
| example | 1.0.0 | 2.0.0 | major | npm outdated / Dependabot PR #N |

### 2. Strategy Selection

Ask the user which approach for this session:

- **Batch low-risk, majors one-by-one** — patch+minor together, each major separately
- **All one-by-one** — safest, upgrade and verify each individually
- **All at once** — fast, single upgrade + verify pass

### 3. Per-Upgrade Checklist

For each dependency (or batch):

#### 3a. Check peer dependencies

Before upgrading, verify dependents support the new version:

```bash
npm view <dependent-pkg>@latest peerDependencies
```

**If peer deps don't support the new major:** Skip the upgrade. Don't use `--force` or `--legacy-peer-deps`. Document which packages block it and why.

#### 3b. Research changelog

Use Exa or WebSearch to find the release page / changelog. Summarize:
- **Breaking changes** that affect this project
- **Deprecations** to be aware of
- **New features** relevant to how we use this package

If it's a Dependabot PR, also read the PR description for release notes.

#### 3c. Check usage in project

Grep for imports and usage to understand blast radius:

```bash
grep -r "from ['\"]<package>" src/ --include="*.ts" --include="*.tsx"
```

Report: how many files import it, which areas of the codebase are affected.

#### 3d. Upgrade

```bash
npm install <package>@latest
```

If this is a Dependabot PR, merge it instead:
```bash
gh pr merge <number> --squash
git pull
```

Group tightly coupled packages in one upgrade (e.g., vitest + @vitest/* + jsdom).

#### 3e. Verify

```bash
npm run check && npm run build && npm run test
```

For UI-related deps (React, Storybook, CSS libraries, etc.):
```bash
npm run build:storybook
```

If verification fails:
1. Read the error carefully
2. Check the changelog for migration steps
3. Fix the issue
4. Re-verify

#### 3f. Report

Tell the user:
- What version changed (from → to)
- Any deprecation warnings in the output
- Any new features worth adopting
- Whether verification passed clean

#### 3g. Commit

```bash
git add -A
git commit -m "chore(deps): upgrade <package> X → Y"
```

Use `→` (unicode arrow). Group related packages: `chore(deps): upgrade vitest 3 → 4, jsdom 27 → 28`

### 4. Summary

After all upgrades:

- **Upgraded:** list with version changes
- **Deprecation warnings:** anything to address later
- **New features:** worth exploring in a future session
- **Skipped:** any deps not upgraded and why (peer dep conflicts, ecosystem not ready, etc.)

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `--force` to bypass peer conflicts | Skip the upgrade. Forced installs hide real incompatibilities. |
| Upgrading everything at once | One commit per upgrade. Bisect needs isolation. |
| Not checking peer deps first | Always check `peerDependencies` before bumping. |
| Committing without full verification | Run check + build + test between each upgrade. |
| Ignoring pre-existing test failures | Compare test output before/after. Only care about *new* failures. |
