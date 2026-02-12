import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

import tseslint from 'typescript-eslint';

export default [
  // Base recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

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
      'packages/*/dist/',
      'packages/*/coverage/',
      'set-version.js',
    ],
  },

  // --------------------------------------------
  // Browser source files
  // --------------------------------------------
  {
    files: ['packages/*/src/**/*.js', 'packages/*/src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            'tsconfig.json',
            'packages/core/tsconfig.json',
            'packages/browser/tsconfig.json',
            'packages/react/tsconfig.json',
            'packages/vue/tsconfig.json',
            'packages/svelte/tsconfig.json',
            'packages/next/tsconfig.json',
          ],
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,

      // Allow console in a library (logging is intentional)
      'no-console': 'off',

      // Allow "_" as intentional unused placeholder
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Fix import errors
      'import/no-unresolved': 'error',
    },
  },

  // --------------------------------------------
  // Node / tooling files (vite, config, etc.)
  // --------------------------------------------
  {
    files: ['*.config.js', 'vite.config.js', 'packages/**/*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        URL: 'readonly', // Ensure URL is known
      },
    },
    plugins: {
      n: nPlugin,
    },
    rules: {
      ...nPlugin.configs.recommended.rules,
      'n/no-extraneous-import': 'off',
    },
  },

  // --------------------------------------------
  // Test files (Vitest + JSDOM)
  // --------------------------------------------
  {
    files: ['**/*.test.js', '**/*.test.ts'],
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
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
