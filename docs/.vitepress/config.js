// docs/.vitepress/config.js

import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Ctrovalidate',
  description: 'A lightweight, powerful, and zero-dependency JavaScript library for client-side form validation.',
  base: '/ctrovalidate/', // Important for GitHub Pages deployment

  // Theme-specific configuration
  themeConfig: {
    logo: '/logo.svg', // We'll create this soon

    // Navigation bar links
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/methods' },
      { text: 'v2.0.0', items: [
          { text: 'Changelog', link: 'https://github.com/ctrotech-tutor/ctrovalidate/releases' },
        ]
      }
    ],

    // Sidebar navigation
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Ctrovalidate?', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Configuration Options', link: '/guide/configuration' },
            { text: 'Built-in Rules', link: '/guide/rules' },
            { text: 'Conditional Validation', link: '/guide/conditional-validation' },
            { text: 'Working with SPAs', link: '/guide/spa-dynamic-fields' },
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Creating Custom Rules', link: '/guide/custom-rules' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Public Methods', link: '/api/methods' },
            { text: 'Static Methods', link: '/api/static-methods' },
            { text: 'TypeScript Types', link: '/api/types' },
          ]
        }
      ]
    },

    // Social links to show in the navigation bar
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ctrotech-tutor/ctrovalidate' }
    ],

    // Footer configuration
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Ctrotech'
    },

    // Algolia search (can be configured later )
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '...',
    //     apiKey: '...',
    //     indexName: '...'
    //   }
    // }
  }
});
