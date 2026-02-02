# [3.0.0](https://github.com/ctrotech-tutor/ctrovalidate/compare/v2.1.1...v3.0.0) (2026-02-02)

### Features

- **demos:** diversified demo suite and fixed core test mocks ([6c5a995](https://github.com/ctrotech-tutor/ctrovalidate/commit/6c5a995c595de89094ec9ad639e69e42b2939469))
- **examples:** overhaul ecosystem with multi-framework monochrome demos and industrial standards ([cc201c5](https://github.com/ctrotech-tutor/ctrovalidate/commit/cc201c52b516ecbebb2b04cd2c51f051e69a6261))

### Tests

- achieve 98% coverage with comprehensive edge case testing ([b4a294c](https://github.com/ctrotech-tutor/ctrovalidate/commit/b4a294c8761bd670181145bb3f6d833e791d2969))

### BREAKING CHANGES

- None

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
