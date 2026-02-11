import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import importPlugin from 'eslint-plugin-import';
import promisePlugin from 'eslint-plugin-promise';
import nPlugin from 'eslint-plugin-n';
import prettier from 'eslint-config-prettier';

export default [
  /*
  |--------------------------------------------------------------------------
  | Base JavaScript Recommended
  |--------------------------------------------------------------------------
  */
  js.configs.recommended,

  /*
  |--------------------------------------------------------------------------
  | TypeScript Recommended (Flat Config Version)
  |--------------------------------------------------------------------------
  */
  ...tseslint.configs.recommended,

  /*
  |--------------------------------------------------------------------------
  | Prettier Compatibility
  |--------------------------------------------------------------------------
  */
  prettier,

  /*
  |--------------------------------------------------------------------------
  | Global Ignores
  |--------------------------------------------------------------------------
  */
  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      '.vercel/',
      'docs/.vitepress/dist/',
      'docs/.vitepress/cache/',
      'packages/*/dist/',
      'packages/*/coverage/',
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Browser Source Files
  |--------------------------------------------------------------------------
  */
  {
    files: ['packages/*/src/**/*.{js,ts}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json', 'packages/*/tsconfig.json'],
          alwaysTryTypes: true,
        },
      },
    },

    plugins: {
      import: importPlugin,
      promise: promisePlugin,
    },

    rules: {
      /*
      |--------------------------------------------------------------------------
      | Core Rules
      |--------------------------------------------------------------------------
      */
      'no-console': 'off',

      /*
      |--------------------------------------------------------------------------
      | TypeScript
      |--------------------------------------------------------------------------
      */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      /*
      |--------------------------------------------------------------------------
      | Import Rules
      |--------------------------------------------------------------------------
      */
      'import/no-unresolved': 'error',

      /*
      |--------------------------------------------------------------------------
      | Promise Rules
      |--------------------------------------------------------------------------
      */
      'promise/always-return': 'off',
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Node / Tooling Files
  |--------------------------------------------------------------------------
  */
  {
    files: [
      '*.config.js',
      '*.config.ts',
      'vite.config.*',
      'packages/**/*.config.*',
    ],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      n: nPlugin,
    },

    rules: {
      ...nPlugin.configs['flat/recommended'].rules,
      'n/no-extraneous-import': 'off',
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Test Files (Vitest + JSDOM)
  |--------------------------------------------------------------------------
  */
  {
    files: ['**/*.test.{js,ts}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      'no-console': 'off',
      'n/no-missing-import': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
