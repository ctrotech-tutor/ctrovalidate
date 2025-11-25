// src/index.js

/**
 * @file This is the main entry point for the Ctrovalidate.js library.
 * It defines the public API, making only the main Ctrovalidate class available
 * as a named export. Other properties like LogLevel are attached as static
 * properties to the main class for a cleaner, more organized API.
 */

import { Ctrovalidate as CtrovalidateCore } from './core/Ctrovalidate.js';
import { LogLevel } from './utils/Logger.js';

// Attach LogLevel as a static property to the main class.
// This allows users to access it via Ctrovalidate.LogLevel.DEBUG
CtrovalidateCore.LogLevel = LogLevel;

// Re-export the enhanced class as the primary named export.
export const Ctrovalidate = CtrovalidateCore;
