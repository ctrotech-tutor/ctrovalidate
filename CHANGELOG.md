# 2.1.0 (2026-01-29)

### Bug Fixes

- adjust build config for type generation ([3484690](https://github.com/ctrotech-tutor/ctrovalidate/commit/3484690eec247a5a6e21b04edf83aa4e1d57335f))
- replace unused imports with typedefs ([c7a1a63](https://github.com/ctrotech-tutor/ctrovalidate/commit/c7a1a63b122ce107bff316567404beb4e696f9c9))
- **test:** update json rule test expectation to match strict implementation ([b195d62](https://github.com/ctrotech-tutor/ctrovalidate/commit/b195d62234da5832e61236ed7ff768e68caec6d4))

### Features

- Add validation rules for various formats and constraints ([20f874e](https://github.com/ctrotech-tutor/ctrovalidate/commit/20f874e5a01ad39eaf0d67c60c9a771163a8351d))
- **examples:** add integration examples and guides for major frameworks ([b726583](https://github.com/ctrotech-tutor/ctrovalidate/commit/b7265836b04dc583053f20a310ca79e237dbd9f0))
- **examples:** add integration examples and guides for major frameworks" -m "Adds examples and in-depth docs for Tailwind, Alpine, htmx, Vue, React, Svelte, and Next.js; updates docs config. ([26bf91a](https://github.com/ctrotech-tutor/ctrovalidate/commit/26bf91a97b37a7b866b1e500a1036a806c58dfa7))
- **project:** implement professional governance and maintenance workflows ([10ba2fc](https://github.com/ctrotech-tutor/ctrovalidate/commit/10ba2fc4ca70a7541fbc46d5c6665b974b48e2c0))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-

### Changed

-

### Fixed

- ***

## [2.0.0] - 2025-11-28

This is a major rewrite of the library, focusing on modularity, accessibility, and developer experience.

### Added

- **Full Accessibility:** Automatic management of ARIA attributes (`aria-invalid`, `aria-describedby`).
- **Programmatic API:** New `addField()` and `removeField()` methods for dynamic forms and SPA integration.
- **TypeScript Definitions:** The library now ships with a comprehensive `index.d.ts` file.
- **Official Documentation:** A new documentation website built with VitePress.
- **Professional GitHub Presence:** Added CI workflow, issue/PR templates, `CONTRIBUTING.md`, and `CODE_OF_CONDUCT.md`.
- **Advanced Messaging:** The messaging system now supports multiple parameters (e.g., for the `between` rule).

### Changed

- **BREAKING:** The library has been renamed from `Validus` to `Ctrovalidate`.
- **BREAKING:** The main export is now a named export: `import { Ctrovalidate } from 'ctrovalidate';`.
- **BREAKING:** HTML attributes have been renamed from `data-validus-*` to `data-ctrovalidate-*`.
- **BREAKING:** The `RuleParser` now returns a `params` array instead of a `param` string. All custom rules must be updated to expect an array.
- **Internal Refactor:** The core `Validator.js` has been split into `Ctrovalidate.js`, `FormController.js`, and `RuleEngine.js` for better separation of concerns.
- **Internal Refactor:** All built-in rules have been split into individual files under `src/rules/definitions/`.
- **Project Structure:** The `src/` directory has been completely reorganized for better scalability.

### Fixed

- The `between` rule now correctly displays both of its parameters in the error message.
- The `Logger` now correctly uses the new `Ctrovalidate` prefix.

### Removed

- **BREAKING:** The default export has been removed in favor of the named export.
