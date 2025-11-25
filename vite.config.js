// vite.config.js

/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

/**
 * @file This is the configuration file for Vite.
 * This version is now fully configured for both building the library and running tests with Vitest.
 */
export default defineConfig({
  // --- Build Configuration (for creating the 'dist' folder) ---
  build: {
    lib: {
      // The entry point remains src/index.js, which is correct.
      entry: resolve(__dirname, 'src/index.js'),
      // Ensure the global variable name for the UMD build is 'Ctrovalidate'.
      name: 'Ctrovalidate',
      // The output filenames are already correct based on package.json.
      fileName: (format) => `ctrovalidate.${format === 'es' ? 'js' : 'umd.cjs'}`,
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
    // This enables Vitest's global APIs (e.g., `test`, `expect`, `describe`)
    // so we don't have to import them in every single test file.
    globals: true,

    // This simulates a DOM environment (using 'jsdom') so we can test code
    // that might interact with DOM elements, even though we are in a Node.js environment.
    // This is crucial for a front-end library.
    environment: 'jsdom',
  },
});
