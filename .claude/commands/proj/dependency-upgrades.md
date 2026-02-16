Upgrade npm dependencies one major version at a time, with verification between each. One commit per upgrade for easy bisect/revert.

## When to Use

- Major version bumps (semver breaking changes)
- Batch dependency maintenance sessions
- When dependabot PRs need manual intervention

**Not for:** Minor/patch bumps (just `npm update`), or single obvious upgrades.

## Process

### 1. Assess

```bash
npm outdated                    # See what's behind
npm view <pkg>@latest version   # Check latest
```

For each major bump, check:
- Release notes / changelog for breaking changes
- Peer dependency compatibility with other packages

### 2. Check Peer Dependencies Before Upgrading

This is the critical step. Before bumping a package, verify its dependents support the new version:

```bash
npm view <dependent-pkg>@latest peerDependencies
```

**If peer deps don't support the new major:** Stop. Skip that upgrade. The ecosystem isn't ready.

Example: ESLint 10 was blocked because `typescript-eslint`, `eslint-plugin-react`, and `eslint-plugin-react-hooks` all capped at `^9`.

### 3. Upgrade One at a Time

For each upgrade:

1. Edit `package.json` (exact version for deps, caret for devDeps as appropriate)
2. `npm install`
3. `npm run check` (format + lint + compile + knip)
4. `npm run build`
5. `npm run test` (note pre-existing failures vs new ones)
6. Commit: `chore(deps): upgrade <pkg> X → Y`

Group tightly coupled packages in one commit (e.g., vitest + @vitest/* + jsdom).

### 4. Final Verification

After all upgrades:

```bash
npm run check
npm run build
npm run dev          # Visual verify in browser
```

## Commit Convention

```
chore(deps): upgrade <package-name> X → Y
chore(deps): upgrade vitest 3 → 4, jsdom 27 → 28
```

Use `→` (unicode arrow), group related packages in one message.

## Handling Blocked Upgrades

When an upgrade is blocked by peer deps:

1. Document which packages block it and why
2. Skip the upgrade entirely — don't use `--force` or `--legacy-peer-deps`
3. Ensure dependabot is configured to track it (`.github/dependabot.yml`)
4. Use groups in dependabot so related packages get bumped together:

```yaml
groups:
  eslint:
    patterns:
      - "eslint"
      - "@eslint/*"
      - "eslint-plugin-*"
      - "typescript-eslint"
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using `--force` to bypass peer conflicts | Skip the upgrade. Forced installs hide real incompatibilities. |
| Upgrading everything at once | One commit per upgrade. Bisect needs isolation. |
| Not checking peer deps first | Always `npm view <pkg> peerDependencies` before bumping. |
| Committing without full verification | Run check + build + test between each upgrade. |
| Ignoring pre-existing test failures | Compare test output before/after. Only care about *new* failures. |
