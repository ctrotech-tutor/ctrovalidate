import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Logger, LogLevel } from './Logger';
import { parseRules } from './RuleParser';

describe('Utility Classes', () => {
  describe('Logger', () => {
    let logger: Logger;

    beforeEach(() => {
      logger = new Logger(LogLevel.NONE);
    });

    it('should not log anything when LogLevel is NONE', () => {
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      logger.debug('S', 'M');
      logger.info('S', 'M');
      logger.warn('S', 'M');
      logger.error('S', 'M');

      expect(debugSpy).not.toHaveBeenCalled();
      expect(infoSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();

      vi.restoreAllMocks();
    });

    it('should log only errors when LogLevel is ERROR', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      logger.setLevel(LogLevel.ERROR);
      logger.error('S', 'ErrorMsg');
      logger.warn('S', 'WarnMsg');

      expect(errorSpy).toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();

      vi.restoreAllMocks();
    });

    it('should log info, warn, and error when LogLevel is INFO', () => {
      const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      logger.setLevel(LogLevel.INFO);
      logger.info('S', 'InfoMsg');
      logger.warn('S', 'WarnMsg');
      logger.debug('S', 'DebugMsg');

      expect(infoSpy).toHaveBeenCalled();
      expect(warnSpy).toHaveBeenCalled();
      expect(debugSpy).not.toHaveBeenCalled();

      vi.restoreAllMocks();
    });

    it('should log all when LogLevel is DEBUG', () => {
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      logger.setLevel(LogLevel.DEBUG);
      logger.debug('S', 'DebugMsg');
      expect(debugSpy).toHaveBeenCalled();
      vi.restoreAllMocks();
    });
  });

  describe('RuleParser', () => {
    it('should return empty array for invalid input', () => {
      // @ts-ignore
      expect(parseRules(null)).toEqual([]);
      // @ts-ignore
      expect(parseRules(undefined)).toEqual([]);
      expect(parseRules('')).toEqual([]);
      // @ts-ignore
      expect(parseRules(123)).toEqual([]);
    });

    it('should skip empty parts in rule string', () => {
      expect(parseRules('required||minLength:3')).toEqual([
        { name: 'required', params: [] },
        { name: 'minLength', params: ['3'] },
      ]);
    });

    it('should handle rules with optional colons but empty params', () => {
      // Technically current logic gives [""] for empty param string after colon
      expect(parseRules('required:')).toEqual([
        { name: 'required', params: [''] },
      ]);
    });

    it('should handle complex rule strings', () => {
      const result = parseRules('required | minLength: 3 | between: 1, 10');
      expect(result).toEqual([
        { name: 'required', params: [] },
        { name: 'minLength', params: ['3'] },
        { name: 'between', params: ['1', '10'] },
      ]);
    });

    it('should skip rule if ruleName is empty', () => {
      expect(parseRules(':3')).toEqual([]);
      expect(parseRules('  :3')).toEqual([]);
    });
  });
});
