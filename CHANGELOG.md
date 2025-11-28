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
