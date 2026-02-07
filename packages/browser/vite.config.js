/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * @file This is the configuration file for Vite.
 * This version is now fully configured for both building the library and running tests with Vitest.
 */
export default defineConfig({
  plugins: [],
  // --- Build Configuration (for creating the 'dist' folder) ---
  build: {
    lib: {
      // The entry point is now src/index.ts
      entry: resolve(__dirname, 'src/index.ts'),
      // Ensure the global variable name for the UMD build is 'Ctrovalidate'.
      name: 'Ctrovalidate',
      // The output filenames are already correct based on package.json.
      fileName: (format) =>
        `ctrovalidate.${format === 'es' ? 'js' : 'umd.cjs'}`,
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        // Our index.js uses named exports, so this is correct.
        exports: 'named',
      },
    },
  },

  // --- Test Configuration (for running Vitest) ---
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/index.ts'],
      all: true,
    },
  },
});
