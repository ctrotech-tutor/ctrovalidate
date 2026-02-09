# Monorepo Release Workflow (Changesets)

Ctrovalidate uses [Changesets](https://github.com/changesets/changesets) for managing versions and changelogs across its monorepo packages. This ensures that only relevant packages are bumped and that inter-package dependencies are correctly handled.

## 🚀 Common Workflow

### 1. Adding a Change

When you've made a change that should be reflected in a release, run:

```bash
npm run changeset
```

Follow the interactive prompts:

- Select the package(s) that were modified.
- Choose the appropriate semver bump (major, minor, or patch).
- Write a concise, human-readable description of your change.

This creates a new markdown file in the `.changeset/` directory. **Commit this file** with your PR.

### 2. Versioning Packages

When it's time to prepare a release (usually on the `main` branch), run:

```bash
npm run version-packages
```

This command will:

- Consume all existing changesets.
- Update `package.json` versions across the workspace.
- Update `CHANGELOG.md` files in each affected package.
- Automatically commit these changes (configured in `.changeset/config.json`).

### 3. Publishing to NPM

To publish the new versions to the NPM registry:

```bash
npm run release
```

This runs a full monorepo build using `turbo` and then executes `changeset publish` to upload all pending versions.

---

## 🛠️ Configuration Details

The release system is governed by `.changeset/config.json`:

- **Fixed Versions**: All `@ctrovalidate/*` packages are configured to share the same version number for ecosystem consistency.
- **Public Access**: All packages are published with public access.
- **Auto-Commit**: Version bumps are automatically committed to the repository.
