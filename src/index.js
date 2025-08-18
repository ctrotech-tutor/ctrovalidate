// src/index.js (New Version)

/**
 * @file This is the main entry point for the Ctrovalidate.js library.
 * I'm using this file to define the public-facing API. By only exporting
 * the main `Ctrovalidate` class and the `LogLevel` enum as named exports,
 * we create a clear, unambiguous API for all environments.
 */

import { Validus as Ctrovalidate } from './core/Validator.js'; // Rename on import
import { LogLevel } from './core/Logger.js';

// Export both as named exports.
export { Ctrovalidate, LogLevel };
