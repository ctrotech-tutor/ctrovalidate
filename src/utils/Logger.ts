// src/utils/Logger.ts

/**
 * Defines the available logging levels.
 */
export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

/**
 * A versatile logger class that provides level-based logging.
 */
export class Logger {
  #level: LogLevel;

  /**
   * @param level - The initial logging level for the instance.
   */
  constructor(level: LogLevel = LogLevel.NONE) {
    this.#level = level;
  }

  /**
   * Sets the logging level.
   * @param level - The new logging level to set.
   */
  setLevel(level: LogLevel): void {
    this.#level = level;
  }

  /**
   * Logs a detailed message intended for deep debugging.
   */
  debug(source: string, message: string, ...args: any[]): void {
    if (this.#level >= LogLevel.DEBUG) {
      console.debug(`[Ctrovalidate::${source}] ${message}`, ...args);
    }
  }

  /**
   * Logs an informational message.
   */
  info(source: string, message: string, ...args: any[]): void {
    if (this.#level >= LogLevel.INFO) {
      console.info(
        `[Ctrovalidate::${source}] %c${message}`,
        'color: #22c55e',
        ...args
      );
    }
  }

  /**
   * Logs a warning.
   */
  warn(source: string, message: string, ...args: any[]): void {
    if (this.#level >= LogLevel.WARN) {
      console.warn(`[Ctrovalidate::${source}] ${message}`, ...args);
    }
  }

  /**
   * Logs a critical error.
   */
  error(source: string, message: string, ...args: any[]): void {
    if (this.#level >= LogLevel.ERROR) {
      console.error(`[Ctrovalidate::${source}] ${message}`, ...args);
    }
  }
}
