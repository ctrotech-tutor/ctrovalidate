// src/core/Logger.js

/**
 * @file Defines the logging system for Validus.js.
 * This provides a structured and controllable way to output debug, info,
 * warning, and error messages to the console.
 */

/**
 * Defines the available logging levels.
 * A higher number indicates a higher priority.
 * The logger will only output messages at or above its configured level.
 * @enum {number}
 */
export const LogLevel = {
  NONE: 0,  // No logs
  ERROR: 1, // Only critical errors
  WARN: 2,  // Warnings and errors
  INFO: 3,  // Informational messages, warnings, and errors
  DEBUG: 4, // All messages, for deep debugging
};

/**
 * @class Logger
 * @description A versatile logger class that provides level-based logging.
 * I've designed this to give us clear insight into the library's internal
 * operations during development, and to allow the end-user to enable
 * detailed logging if they need to debug their own implementation.
 */
export class Logger {
  /**
   * The current logging level. Only messages at this level or higher will be shown.
   * @private
   * @type {number}
   */
  #level;

  /**
   * @constructor
   * @param {number} [level=LogLevel.NONE] - The initial logging level for the instance.
   */
  constructor(level = LogLevel.NONE) {
    this.#level = level;
  }

  /**
   * Allows me to change the logging level at any time, which is useful for
   * dynamically increasing verbosity when debugging a specific issue.
   * @param {number} level - The new logging level to set.
   */
  setLevel(level) {
    this.#level = level;
  }

  /**
   * Logs a detailed message intended for deep debugging. These are messages
   * that trace the execution flow, variable states, and other low-level details.
   * @param {string} source - The source of the log (e.g., 'Validator', 'UIManager').
   * @param {string} message - The descriptive message to log.
   * @param {...any} args - Additional data to log, which will be displayed interactively in the console.
   */
  debug(source, message, ...args) {
    if (this.#level >= LogLevel.DEBUG) {
      // Using console.debug for these logs.
      console.debug(`[Validus::${source}] ${message}`, ...args);
    }
  }

  /**
   * Logs an informational message. I use this to announce major lifecycle events,
   * like when the library is initialized or when a major operation completes successfully.
   * @param {string} source - The source of the log.
   * @param {string} message - The descriptive message to log.
   * @param {...any} args - Additional data to log.
   */
  info(source, message, ...args) {
    if (this.#level >= LogLevel.INFO) {
      // Styling this with a pleasant green color to make it stand out as a positive status message.
      console.info(`[Validus::${source}] %c${message}`, 'color: #22c55e', ...args);
    }
  }

  /**
   * Logs a warning. I use this for non-critical issues that might indicate a problem
   * or a potential misuse of the library, but that don't cause the library to crash.
   * For example, if a developer tries to use a rule that doesn't exist.
   * @param {string} source - The source of the log.
   * @param {string} message - The descriptive message to log.
   * @param {...any} args - Additional data to log.
   */
  warn(source, message, ...args) {
    if (this.#level >= LogLevel.WARN) {
      // console.warn naturally provides a distinct style in most browser consoles.
      console.warn(`[Validus::${source}] ${message}`, ...args);
    }
  }

  /**
   * Logs a critical error. This is for issues that prevent a specific operation
   * from completing or represent a definite bug or misconfiguration.
   * @param {string} source - The source of the log.
   * @param {string} message - The descriptive message to log.
   * @param {...any} args - Additional data to log.
   */
  error(source, message, ...args) {
    if (this.#level >= LogLevel.ERROR) {
      // console.error is the standard for critical issues.
      console.error(`[Validus::${source}] ${message}`, ...args);
    }
  }
}


