import {
  _ as e,
  c as t,
  o as i,
  ag as s,
} from './chunks/framework.COADSRRV.js';
const u = JSON.parse(
    '{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"2.0/guide/introduction.md","filePath":"2.0/guide/introduction.md"}'
  ),
  n = { name: '2.0/guide/introduction.md' };
function l(r, a, o, d, h, p) {
  return (
    i(),
    t('div', null, [
      ...(a[0] ||
        (a[0] = [
          s(
            `<h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>Ctrovalidate is a lightweight, zero-dependency JavaScript library designed to make form validation <strong>declarative, maintainable, and accessible</strong>.</p><h2 id="why-ctrovalidate" tabindex="-1">Why Ctrovalidate? <a class="header-anchor" href="#why-ctrovalidate" aria-label="Permalink to &quot;Why Ctrovalidate?&quot;">​</a></h2><p>Modern web development often complicates form validation by forcing logic into complex JavaScript structures. Ctrovalidate returns to the roots of the web, allowing you to define your validation rules right where your data lives: <strong>in the HTML</strong>.</p><h3 id="key-advantages" tabindex="-1">Key Advantages <a class="header-anchor" href="#key-advantages" aria-label="Permalink to &quot;Key Advantages&quot;">​</a></h3><ul><li><strong>🚀 Zero Dependencies</strong>: At less than 5kb gzipped, it adds virtually no overhead to your bundle.</li><li><strong>🛠️ HTML-First</strong>: Define rules using standard <code>data</code> attributes. Easy to read, easy to change.</li><li><strong>🏗️ Industrial Strength</strong>: Built-in support for async validation, complex field dependencies, and custom rule registration.</li><li><strong>♿ First-Class Accessibility</strong>: Automatically manages ARIA attributes (<code>aria-invalid</code>, <code>aria-describedby</code>) to ensure your forms are usable by everyone.</li><li><strong>🧩 Framework Agnostic</strong>: Works perfectly with Vanilla JS, and provides seamless patterns for React, Vue, Svelte, and Alpine.js.</li></ul><h2 id="the-declarative-approach" tabindex="-1">The Declarative Approach <a class="header-anchor" href="#the-declarative-approach" aria-label="Permalink to &quot;The Declarative Approach&quot;">​</a></h2><p>Traditional validation requires writing imperative code to check values. With Ctrovalidate, you express <em>what</em> should be valid, and the library handles the <em>how</em>.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- Simple, readable, and powerful --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">input</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;email&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;subscriber_email&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  data-ctrovalidate-rules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;required|email&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  data-ctrovalidate-if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wants_newsletter:checked&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;</span></span></code></pre></div><p>In the example above, the field is only validated as a required email if the <code>wants_newsletter</code> checkbox is checked. Zero lines of custom logic required.</p><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><p>Ready to build better forms?</p><ul><li><a href="./getting-started.html">Getting Started</a></li><li><a href="./configuration.html">Core Concepts</a></li><li><a href="./rules.html">Built-in Rules</a></li></ul>`,
            13
          ),
        ])),
    ])
  );
}
const k = e(n, [['render', l]]);
export { u as __pageData, k as default };
