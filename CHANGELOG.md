## [2.1.1](https://github.com/ctrotech-tutor/ctrovalidate/compare/v2.1.0...v2.1.1) (2026-01-31)

### Bug Fixes

- **Industrialization**: Standardized framework integration suite with high-standards monochrome examples for React, Vue, Next.js, and Alpine.js.
- **Documentation Overhaul**: Complete rewrite of the documentation site with localized integration guides and professional patterns.
- **Ecosystem Expansion**: Introduced dedicated `demo-*` repository structure for framework-specific examples.
- **Quality Assurance**: Resolved critical linting errors in test files and refined internal validation engine stability.
- **VitePress Configuration**: Enhanced VitePress configuration with advanced social metadata tags.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-01-29

### Added

- Comprehensive validation rules for various formats and constraints.
- Framework integration guides for Tailwind CSS, Alpine.js, htmx, Vue, React, Svelte, and Next.js.
- Dedicated documentation website built with VitePress.
- Professional governance and maintenance workflows.

### Fixed

- Build configuration for improved TypeScript type generation.
- Replaced unused imports with efficient typedefs.
- Adjusted `json` rule test expectations for stricter implementation compliance.

## [2.0.0] - 2025-11-28

This is a major rewrite of the library, focusing on modularity, accessibility, and modern developer experience.

### Added

- **Full Accessibility**: Automatic management of ARIA attributes (`aria-invalid`, `aria-describedby`).
- **Programmatic API**: New `addField()` and `removeField()` methods for dynamic forms.
- **TypeScript Support**: First-class TypeScript definitions included in the package.
- **Asynchronous Engine**: Built-in support for Promise-based validation logic.

### Changed

- **BREAKING**: Library renamed from `Validus` to `Ctrovalidate`.
- **BREAKING**: JavaScript attributes renamed from `data-validus-*` to `data-ctrovalidate-*`.
- **Internal**: Core architecture split into `Ctrovalidate.js`, `FormController.js`, and `RuleEngine.js`.
- **Internal**: Modularized all built-in rule definitions into individual files.

### Fixed

- Fixed `between` rule parameter interpolation in error messages.
- Standardized logging prefixes across all internal modules.

## [1.x] - Historical

Older versions of the library (previously known as Validus) are no longer actively maintained.

---

[Unreleased]: https://github.com/ctrotech-tutor/ctrovalidate/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/ctrotech-tutor/ctrovalidate/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ctrotech-tutor/ctrovalidate/releases/tag/v2.0.0
