// docs/.vitepress/config.js

import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Ctrovalidate',
  description:
    'A zero-dependency JavaScript form validation library with built-in accessibility support and an HTML-first configuration approach.',
  base: '/',

  lastUpdated: true,
  cleanUrls: true,
  head: [
    // Plausible Analytics
    ['script', { async: 'true', src: 'https://plausible.io/js/pa-K7DUHFzcjenkTx__8xpZP.js' }],
    [
      'script',
      {},
      `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`
    ],
    // Google Tag Manager
    [
      'script',
      {},
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TLSBMQ6H');`
    ],
    ['noscript', {}, `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TLSBMQ6H"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Ctrovalidate",
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "All",
        "description": "Ctrovalidate is a lightweight, accessible, zero-dependency JavaScript form validation library.",
        "url": "https://ctrovalidate.vercel.app/",
        "sameAs": [
          "https://www.npmjs.com/package/ctrovalidate",
          "https://github.com/ctrotech-tutor/ctrovalidate"
        ],
        "author": {
          "@type": "Organization",
          "name": "Ctrotech",
          "url": "https://github.com/ctrotech-tutor"
        }
      })
    ],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ctrovalidate",
        "url": "https://ctrovalidate.vercel.app/",
      })
    ],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'Ctrovalidate' }],
    ['meta', { property: 'og:title', content: 'Ctrovalidate | Form Validation Library' }],
    ['meta', { property: 'og:description', content: 'A zero-dependency JavaScript form validation library with built-in accessibility support and HTML-first configuration.' }],
    ['meta', { property: 'og:url', content: 'https://ctrovalidate.vercel.app/' }],
    ['meta', { property: 'og:image', content: 'https://ctrovalidate.vercel.app/og-image.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Ctrovalidate | Form Validation Library' }],
    ['meta', { name: 'twitter:description', content: 'A zero-dependency JavaScript form validation library with built-in accessibility support and HTML-first configuration.' }],
    ['meta', { name: 'twitter:image', content: 'https://ctrovalidate.vercel.app/og-image.jpg' }],
    ['meta', { name: 'twitter:site', content: '@ctrotech' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'keywords', content: 'form validation, javascript, accessibility, aria, zero-dependency, web-development, frontend' }],
    ['meta', { name: 'google-site-verification', content: '7fw3YE9ijPS8ts75lzzMdnycqj8949WBjJ0awgBrxrE' }],
  ],

  sitemap: {
    hostname: 'https://ctrovalidate.vercel.app/',
  },

  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Integrations', link: '/integrations/tailwindcss' },
      { text: 'API', link: '/api/methods' },
      { text: 'Sponsor', link: '/community/donate' },
      {
        text: 'v3.0.0',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/ctrotech-tutor/ctrovalidate/blob/main/CHANGELOG.md',
          },
          {
            text: 'Releases',
            link: 'https://github.com/ctrotech-tutor/ctrovalidate/releases',
          },
        ],
      },
    ],

    sidebar: {
      // ... sidebar configuration remains the same ...
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Ctrovalidate?', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Configuration Options', link: '/guide/configuration' },
            { text: 'Built-in Rules', link: '/guide/rules' },
            {
              text: 'Conditional Validation',
              link: '/guide/conditional-validation',
            },
            {
              text: 'Working with SPAs',
              link: '/guide/dynamic-fields',
            },
            { text: 'Real-world Examples', link: '/guide/examples' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Creating Custom Rules', link: '/guide/custom-rules' },
          ],
        },
      ],
      '/integrations/': [
        {
          text: 'Framework Integrations',
          items: [
            { text: 'Tailwind CSS', link: '/integrations/tailwindcss' },
            { text: 'Alpine.js', link: '/integrations/alpinejs' },
            { text: 'htmx', link: '/integrations/htmx' },
            { text: 'Vue.js', link: '/integrations/vue' },
            { text: 'React', link: '/integrations/react' },
            { text: 'Svelte', link: '/integrations/svelte' },
            { text: 'Next.js', link: '/integrations/nextjs' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Public Methods', link: '/api/methods' },
            { text: 'Static Methods', link: '/api/static-methods' },
            { text: 'TypeScript Types', link: '/api/types' },
          ],
        },
      ],
      '/project/': [
        {
          text: 'Project Info',
          items: [{ text: 'Release Policy', link: '/project/releases' }],
        },
      ],
      '/community/': [
        {
          text: 'Community',
          items: [
            { text: 'Donate', link: '/community/donate' },
          ],
        },
      ],
    },

    // Updated Social links section
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ctrotech-tutor',
      },
      { icon: 'twitter', link: 'https://twitter.com/ctrotech' },
      { icon: 'youtube', link: 'https://youtube.com/@ctrotech' },
      // For email, we use a custom SVG icon
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z"/></svg>',
        },
        link: 'mailto:ctrotech.devs@gmail.com',
        ariaLabel: 'Email us',
      },
      // For a community chat, you could add:
      // { icon: 'discord', link: 'https://discord.gg/your-invite-code' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Ctrotech',
    },
  },
});
