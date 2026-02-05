import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Base recommended rules
  js.configs.recommended,

  // Prettier compatibility
  prettier,

  // Ignore paths
  {
    ignores: [
      'dist/',
      'coverage/',
      'node_modules/',
      'docs/',
      'examples/',
      'docs/.vitepress/dist/',
      'docs/.vitepress/cache/',
      '.vercel/',
    ],
  },

  // --------------------------------------------
  // Browser source files
  // --------------------------------------------
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,

      // Allow console in a library (logging is intentional)
      'no-console': 'off',

      // Allow "_" as intentional unused placeholder
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // --------------------------------------------
  // Node / tooling files (vite, config, etc.)
  // --------------------------------------------
  {
    files: ['*.config.js', 'vite.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      n: nPlugin,
    },
    rules: {
      ...nPlugin.configs.recommended.rules,
    },
  },

  // --------------------------------------------
  // Test files (Vitest + JSDOM)
  // --------------------------------------------
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Tests can import freely
      'n/no-missing-import': 'off',

      // Console allowed in tests
      'no-console': 'off',
    },
  },
];
