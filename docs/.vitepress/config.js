// docs/.vitepress/config.js

import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Ctrovalidate',
  description:
    'A lightweight, powerful, and zero-dependency JavaScript library for client-side form validation.',
  base: '/ctrovalidate',

  rewrites: {
    '/:page*': '/2.0/:page*',
  },

  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Guide', link: '/2.0/guide/getting-started' },
      { text: 'Integrations', link: '/2.0/integrations/tailwindcss' },
      { text: 'API', link: '/2.0/api/methods' },
      {
        text: 'v2.0.0 (Latest)',
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
      '/2.0/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Ctrovalidate?', link: '/2.0/guide/introduction' },
            { text: 'Getting Started', link: '/2.0/guide/getting-started' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Configuration Options', link: '/2.0/guide/configuration' },
            { text: 'Built-in Rules', link: '/2.0/guide/rules' },
            {
              text: 'Conditional Validation',
              link: '/2.0/guide/conditional-validation',
            },
            {
              text: 'Working with SPAs',
              link: '/2.0/guide/spa-dynamic-fields',
            },
            { text: 'Real-world Examples', link: '/2.0/guide/examples' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Creating Custom Rules', link: '/2.0/guide/custom-rules' },
          ],
        },
      ],
      '/2.0/integrations/': [
        {
          text: 'Framework Integrations',
          items: [
            { text: 'Tailwind CSS', link: '/2.0/integrations/tailwindcss' },
            { text: 'Alpine.js', link: '/2.0/integrations/alpinejs' },
            { text: 'htmx', link: '/2.0/integrations/htmx' },
            { text: 'Vue.js', link: '/2.0/integrations/vue' },
            { text: 'React', link: '/2.0/integrations/react' },
            { text: 'Svelte', link: '/2.0/integrations/svelte' },
            { text: 'Next.js', link: '/2.0/integrations/nextjs' },
          ],
        },
      ],
      '/2.0/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Public Methods', link: '/2.0/api/methods' },
            { text: 'Static Methods', link: '/2.0/api/static-methods' },
            { text: 'TypeScript Types', link: '/2.0/api/types' },
          ],
        },
      ],
      '/2.0/project/': [
        {
          text: 'Project Info',
          items: [{ text: 'Release Policy', link: '/2.0/project/releases' }],
        },
      ],
    },

    // Updated Social links section
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ctrotech-tutor/ctrovalidate',
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
