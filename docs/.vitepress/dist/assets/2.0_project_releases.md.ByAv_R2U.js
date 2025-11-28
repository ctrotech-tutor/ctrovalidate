import {
  _ as a,
  c as o,
  o as r,
  ae as t,
} from './chunks/framework.BMU9rCtY.js';
const m = JSON.parse(
    '{"title":"Release Policy & Changelog","description":"","frontmatter":{},"headers":[],"relativePath":"2.0/project/releases.md","filePath":"2.0/project/releases.md"}'
  ),
  i = { name: '2.0/project/releases.md' };
function n(s, e, l, c, h, g) {
  return (
    r(),
    o('div', null, [
      ...(e[0] ||
        (e[0] = [
          t(
            '<h1 id="release-policy-changelog" tabindex="-1">Release Policy &amp; Changelog <a class="header-anchor" href="#release-policy-changelog" aria-label="Permalink to &quot;Release Policy &amp; Changelog&quot;">​</a></h1><p>This document outlines our release policy, our commitment to Semantic Versioning, and how to stay up-to-date with changes to Ctrovalidate.</p><h2 id="semantic-versioning-semver" tabindex="-1">Semantic Versioning (SemVer) <a class="header-anchor" href="#semantic-versioning-semver" aria-label="Permalink to &quot;Semantic Versioning (SemVer)&quot;">​</a></h2><p>Ctrovalidate follows <a href="https://semver.org/spec/v2.0.0.html" target="_blank" rel="noreferrer">Semantic Versioning 2.0.0</a>. This means that our version numbers have specific meanings:</p><ul><li><strong>MAJOR version</strong> (e.g., <code>3.0.0</code>): Will be incremented for incompatible API changes (breaking changes). These will always be accompanied by a detailed migration guide.</li><li><strong>MINOR version</strong> (e.g., <code>2.1.0</code>): Will be incremented when new functionality is added in a backward-compatible manner.</li><li><strong>PATCH version</strong> (e.g., <code>2.0.1</code>): Will be incremented for backward-compatible bug fixes.</li></ul><p>You can rely on this scheme to upgrade safely between minor and patch versions.</p><h2 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h2><p>All notable changes, including new features, bug fixes, and breaking changes, are documented in the <code>CHANGELOG.md</code> file in our repository.</p><p><a href="https://github.com/ctrotech-tutor/ctrovalidate/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer"><strong>View the Full Changelog on GitHub</strong></a></p><h2 id="github-releases" tabindex="-1">GitHub Releases <a class="header-anchor" href="#github-releases" aria-label="Permalink to &quot;GitHub Releases&quot;">​</a></h2><p>For a more high-level overview of each release, including key highlights, you can visit the official GitHub Releases page. This is also where you can download specific versions of the library.</p><p><a href="https://github.com/ctrotech-tutor/ctrovalidate/releases" target="_blank" rel="noreferrer"><strong>View All Releases on GitHub</strong></a></p>',
            12
          ),
        ])),
    ])
  );
}
const p = a(i, [['render', n]]);
export { m as __pageData, p as default };
