## [3.0.2](https://github.com/ctrotech-tutor/ctrovalidate/compare/v3.0.1...v3.0.2) (2026-02-03)

### Bug Fixes

- v3.0.1 patch — multi-class error support, Tailwind integration, dynamic field fixes ([7f43c0b](https://github.com/ctrotech-tutor/ctrovalidate/commit/7f43c0b802648e159eee5f0e43d6c902e10af22f))

## [3.0.1](https://github.com/ctrotech-tutor/ctrovalidate/compare/v3.0.0...v3.0.1) (2026-02-03)

### Bug Fixes

- **core:** resolve CSS.escape crash in JSDOM and Tailwind compatibility issues ([9b850ac](https://github.com/ctrotech-tutor/ctrovalidate/commit/9b850ac6cde4658e70fdaa04ea873f35cf4536c6))

### Documentation

- restructure documentation for v3.0.0 and remove promotional language ([1bfd96a](https://github.com/ctrotech-tutor/ctrovalidate/commit/1bfd96a23657b05e76953df92004184fd7f713ad))

### Features

- **examples:** add v3.0.0 feature showcase banner and cleanup ([b0c883c](https://github.com/ctrotech-tutor/ctrovalidate/commit/b0c883cfdcec9552225e37e5d544736736d38b3f))
- **seo:** complete seo overhaul (assets, structured data, breadcrumbs) ([d3c0ae0](https://github.com/ctrotech-tutor/ctrovalidate/commit/d3c0ae06ca56ee87812058d9e948de90df246b59))

### Performance Improvements

- **seo:** comprehensive schema rollout (breadcrumbs for all pages, webmanifest fix) ([eb85156](https://github.com/ctrotech-tutor/ctrovalidate/commit/eb851562f30fd9a74b07ddabc75d06c50d72733a))

### BREAKING CHANGES

- Documentation structure changed from docs/2.0/_ to docs/_

* Move all documentation from docs/2.0/ to docs/ root for clean v3.0.0 structure
* Update VitePress config version from v2.1.1 to v3.0.0
* Remove obsolete path rewrites for 2.0 folder structure
* Update homepage to remove promotional language:
  - Remove 'Modern' from title and tagline
  - Remove 'Industrial' from code comments
  - Replace vague terms with specific features
* Add v3.0.0 highlights to homepage:
  - TypeScript-native with full type support
  - 98% test coverage for reliability
  - 21 built-in validation rules
  - <5KB gzipped bundle size
  - ARIA-compliant accessibility
* Update features section with factual, measurable benefits
* Prepare structure for future multi-version support (v4)

This restructure sets up clean documentation for v3.0.0 and makes it easy to
add versioned docs (docs/v3/, docs/v4/) when future major versions are released.

# [3.0.1](https://github.com/ctrotech-tutor/ctrovalidate/compare/v3.0.0...v3.0.1) (2026-02-03)

### Bug Fixes

- **Core**: implement `safeEscape` for CSS selectors to support JSDOM/Node environments and fix Tailwind class parsing errors ([7b28a9c](https://github.com/ctrotech-tutor/ctrovalidate/commit/7b28a9c))

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
