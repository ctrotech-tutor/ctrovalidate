// docs/.vitepress/config.js

import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Ctrovalidate',
  description:
    'Ctrovalidate is a lightweight, powerful, and zero-dependency JavaScript library designed for modern web apps, featuring full ARIA support and an accessible-by-default philosophy.',
  base: '/ctrovalidate/',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    [
      'script',
      {},
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KC6DGMLR');`
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/ctrovalidate/logo.svg' }],
    ['link', { rel: 'icon', href: '/ctrovalidate/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/ctrovalidate/favicon-48x48.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/ctrovalidate/favicon-96x96.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/ctrovalidate/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'Ctrovalidate' }],
    ['meta', { property: 'og:title', content: 'Ctrovalidate - Modern & Accessible Form Validation' }],
    ['meta', { property: 'og:description', content: 'Explore Ctrovalidate, the lightweight and ARIA-ready form validation library for modern web apps. Zero-dependency, HTML-first, and designed for accessibility.' }],
    ['meta', { property: 'og:url', content: 'https://ctrotech-tutor.github.io/ctrovalidate/' }],
    ['meta', { property: 'og:image', content: 'https://ctrotech-tutor.github.io/ctrovalidate/og-image.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Ctrovalidate - Modern & Accessible Form Validation' }],
    ['meta', { name: 'twitter:description', content: 'Explore Ctrovalidate, the lightweight and ARIA-ready form validation library for modern web apps. Zero-dependency, HTML-first, and designed for accessibility.' }],
    ['meta', { name: 'twitter:image', content: 'https://ctrotech-tutor.github.io/ctrovalidate/og-image.jpg' }],
    ['meta', { name: 'twitter:site', content: '@ctrotech' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'keywords', content: 'form validation, javascript, accessibility, aria, zero-dependency, web-development, frontend' }],
    ['meta', { name: 'google-site-verification', content: '06TmKUBafqk7SKGbkDYTU6xjsXqlw35V8IrXHCFLB3E' }],
  ],

  sitemap: {
    hostname: 'https://ctrotech-tutor.github.io/ctrovalidate/',
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
