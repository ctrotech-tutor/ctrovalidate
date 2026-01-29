import {
  _ as e,
  c as a,
  o as i,
  ag as l,
} from './chunks/framework.COADSRRV.js';
const p = JSON.parse(
    '{"title":"Static API","description":"","frontmatter":{},"headers":[],"relativePath":"2.0/api/static-methods.md","filePath":"2.0/api/static-methods.md"}'
  ),
  s = { name: '2.0/api/static-methods.md' };
function o(r, t, n, d, c, g) {
  return (
    i(),
    a('div', null, [
      ...(t[0] ||
        (t[0] = [
          l(
            '<h1 id="static-api" tabindex="-1">Static API <a class="header-anchor" href="#static-api" aria-label="Permalink to &quot;Static API&quot;">​</a></h1><p>Static methods and properties are accessed directly on the <code>Ctrovalidate</code> class. They control global behavior across all instances.</p><hr><h2 id="ctrovalidate-addrule" tabindex="-1"><code>Ctrovalidate.addRule()</code> <a class="header-anchor" href="#ctrovalidate-addrule" aria-label="Permalink to &quot;`Ctrovalidate.addRule()`&quot;">​</a></h2><p>Register a standard synchronous rule.</p><ul><li><strong>Signature</strong>: <code>(name: string, logic: Function, message: string) =&gt; void</code></li><li><strong>Logic Signature</strong>: <code>(value, params, field) =&gt; boolean</code></li></ul><hr><h2 id="ctrovalidate-addasyncrule" tabindex="-1"><code>Ctrovalidate.addAsyncRule()</code> <a class="header-anchor" href="#ctrovalidate-addasyncrule" aria-label="Permalink to &quot;`Ctrovalidate.addAsyncRule()`&quot;">​</a></h2><p>Register an asynchronous rule.</p><ul><li><strong>Signature</strong>: <code>(name: string, logic: Function, message: string) =&gt; void</code></li><li><strong>Logic Signature</strong>: <code>(value, params, field, signal) =&gt; Promise&lt;boolean&gt;</code></li></ul><hr><h2 id="ctrovalidate-loglevel" tabindex="-1"><code>Ctrovalidate.LogLevel</code> <a class="header-anchor" href="#ctrovalidate-loglevel" aria-label="Permalink to &quot;`Ctrovalidate.LogLevel`&quot;">​</a></h2><p>The logging configuration enum.</p><table tabindex="0"><thead><tr><th style="text-align:left;">Level</th><th style="text-align:left;">Value</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><code>NONE</code></td><td style="text-align:left;">0</td><td style="text-align:left;">Silent mode. Recommended for production.</td></tr><tr><td style="text-align:left;"><code>ERROR</code></td><td style="text-align:left;">1</td><td style="text-align:left;">Log only critical library failures.</td></tr><tr><td style="text-align:left;"><code>WARN</code></td><td style="text-align:left;">2</td><td style="text-align:left;">Log configuration issues (e.g. missing error containers).</td></tr><tr><td style="text-align:left;"><code>INFO</code></td><td style="text-align:left;">3</td><td style="text-align:left;">Log initialization and field registration.</td></tr><tr><td style="text-align:left;"><code>DEBUG</code></td><td style="text-align:left;">4</td><td style="text-align:left;">Verbose output of every rule execution and event.</td></tr></tbody></table><p><strong>Usage:</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> validator</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Ctrovalidate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(form, {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  logLevel: Ctrovalidate.LogLevel.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DEBUG</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><strong><a href="./methods.html">Instance Methods</a></strong> — Reference for validator instances.</li><li><strong><a href="https://github.com/ctrotech-tutor/ctrovalidate" target="_blank" rel="noreferrer">GitHub Projects</a></strong> — Source code and issues.</li></ul>',
            18
          ),
        ])),
    ])
  );
}
const u = e(s, [['render', o]]);
export { p as __pageData, u as default };
