export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

export class Logger {
  private level: LogLevel;
  private static globalLevel: LogLevel = LogLevel.ERROR;
  private static prefix: string = '[Ctrovalidate]';

  constructor(level: LogLevel = LogLevel.NONE) {
    this.level = level;
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  static setLevel(level: LogLevel) {
    this.globalLevel = level;
  }

  private format(message: string): string {
    return `${Logger.prefix} ${message}`;
  }

  // Instance methods
  error(message: string, ...args: unknown[]) {
    if (this.level >= LogLevel.ERROR) {
      console.error(this.format(message), ...args);
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.level >= LogLevel.WARN) {
      console.warn(this.format(message), ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    if (this.level >= LogLevel.INFO) {
      console.info(this.format(message), ...args);
    }
  }

  debug(message: string, ...args: unknown[]) {
    if (this.level >= LogLevel.DEBUG) {
      console.debug(this.format(message), ...args);
    }
  }

  // Static methods (using global level)
  static error(message: string, ...args: unknown[]) {
    if (this.globalLevel >= LogLevel.ERROR) {
      console.error(`${this.prefix} ${message}`, ...args);
    }
  }

  static warn(message: string, ...args: unknown[]) {
    if (this.globalLevel >= LogLevel.WARN) {
      console.warn(`${this.prefix} ${message}`, ...args);
    }
  }

  static info(message: string, ...args: unknown[]) {
    if (this.globalLevel >= LogLevel.INFO) {
      console.info(`${this.prefix} ${message}`, ...args);
    }
  }

  static debug(message: string, ...args: unknown[]) {
    if (this.globalLevel >= LogLevel.DEBUG) {
      console.debug(`${this.prefix} ${message}`, ...args);
    }
  }
}
