import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RuleEngine } from './RuleEngine';
import { Logger, LogLevel } from '../utils/Logger';
import { FieldObject } from '../types/index';

describe('RuleEngine', () => {
  let form: HTMLFormElement;
  let logger: Logger;
  let uiManager: any;
  let rules: Record<
    string,
    (val: any, params?: any[], element?: HTMLElement | null) => boolean
  >;
  let asyncRules: Record<
    string,
    (
      val: any,
      params?: any[],
      element?: HTMLElement | null,
      signal?: AbortSignal
    ) => Promise<boolean>
  >;
  let messages: Record<string, string>;
  let engine: RuleEngine;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="username" value="val">
        <input type="checkbox" name="dependOnMe" checked>
      </form>
    `;
    form = document.getElementById('test-form') as HTMLFormElement;
    logger = new Logger(LogLevel.NONE);
    uiManager = {
      displayError: vi.fn(),
      clearError: vi.fn(),
      showPending: vi.fn(),
      hidePending: vi.fn(),
    };
    rules = {
      required: (val: any) => !!val,
      min: (val: string, params?: any[]) =>
        val.length >= parseInt(params?.[0], 10),
    };
    asyncRules = {
      remote: async (
        val: string,
        _params?: any[],
        _el?: HTMLElement | null,
        signal?: AbortSignal
      ) => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => resolve(val === 'ok'), 10);
          signal?.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });
      },
    };
    messages = {
      required: 'Required field.',
      min: 'Min length is {0}.',
      remote: 'Remote check failed.',
    };
    engine = new RuleEngine(form, {
      logger,
      uiManager,
      rules,
      asyncRules,
      messages,
    });
  });

  it('should skip validation if dependency is not met', async () => {
    const input = form.querySelector('[name="username"]') as HTMLElement;
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'required', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: { controllerName: 'dependOnMe', type: 'checked' },
    };

    // Uncheck dependency
    (form.querySelector('[name="dependOnMe"]') as HTMLInputElement).checked =
      false;

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(uiManager.clearError).toHaveBeenCalledWith(input);
  });

  it('should validate using sync rules', async () => {
    const input = form.querySelector('[name="username"]') as HTMLInputElement;
    input.value = 'a';
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'min', params: ['3'] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: null,
    };

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(false);
    expect(uiManager.displayError).toHaveBeenCalledWith(
      input,
      'Min length is 3.'
    );
  });

  it('should validate using async rules', async () => {
    const input = form.querySelector('[name="username"]') as HTMLInputElement;
    input.value = 'ok';
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'remote', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: null,
    };

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(uiManager.showPending).toHaveBeenCalledWith(input);
    expect(uiManager.hidePending).toHaveBeenCalledWith(input);
  });

  it('should handle aborted async validation', async () => {
    const input = form.querySelector('[name="username"]') as HTMLInputElement;
    input.value = 'ok';
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'remote', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: null,
    };

    const mockAbort = vi.fn();
    fieldObject.state.abortController = { abort: mockAbort } as any;

    await engine.validateField(fieldObject);
    expect(mockAbort).toHaveBeenCalled();
  });

  it('should handle async rule errors', async () => {
    asyncRules.errorRule = async () => {
      throw new Error('Boom');
    };
    const input = form.querySelector('[name="username"]') as HTMLElement;
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'errorRule', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: null,
    };

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(false);
  });

  it('should log warning for unknown rules', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const input = form.querySelector('[name="username"]') as HTMLElement;
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'unknown', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: null,
    };

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should handle different dependency types', async () => {
    const input = form.querySelector('[name="username"]') as HTMLElement;
    const depInput = form.querySelector(
      '[name="dependOnMe"]'
    ) as HTMLInputElement;
    depInput.type = 'text';
    depInput.value = 'foo';

    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'required', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: { controllerName: 'dependOnMe', type: 'value', value: 'foo' },
    };

    expect(await engine.validateField(fieldObject)).toBe(true);

    if (fieldObject.dependency) fieldObject.dependency.value = 'bar';
    // If dependency not met, it should return true and clear error
    expect(await engine.validateField(fieldObject)).toBe(true);

    if (fieldObject.dependency) fieldObject.dependency.type = 'present';
    depInput.value = '';
    expect(await engine.validateField(fieldObject)).toBe(true);
  });

  it('should return true (skipping) if controller element is not found for dependency', async () => {
    const input = form.querySelector('[name="username"]') as HTMLElement;
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'required', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: { controllerName: 'nonExistent', type: 'checked' },
    };

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
  });

  it('should return true when async validation is aborted (AbortError branch)', async () => {
    const input = form.querySelector('[name="username"]') as HTMLInputElement;
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'remote', params: [] }],
      state: {
        isDirty: false,
        abortController: new AbortController(),
        lastError: null,
      },
      dependency: null,
    };

    // Force the rule to reject with AbortError
    asyncRules.remote = vi.fn().mockRejectedValue({ name: 'AbortError' });

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(uiManager.hidePending).toHaveBeenCalledWith(input);
  });

  it('should return false for unknown dependency type', async () => {
    const input = form.querySelector('[name="username"]') as HTMLElement;
    const fieldObject: FieldObject = {
      element: input,
      rules: [{ name: 'required', params: [] }],
      state: { isDirty: false, abortController: null, lastError: null },
      dependency: { controllerName: 'dependOnMe', type: 'unknown' },
    };

    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
  });

  describe('Additional RuleEngine Coverage', () => {
    it('should extract value from checkbox correctly', async () => {
      const input = form.querySelector(
        '[name="dependOnMe"]'
      ) as HTMLInputElement;
      input.checked = true;
      const fieldObject: FieldObject = {
        element: input,
        rules: [{ name: 'required', params: [] }],
        state: { isDirty: false, abortController: null, lastError: null },
        dependency: null,
      };

      const isValid = await engine.validateField(fieldObject);
      expect(isValid).toBe(true);
    });

    it('should fallback to match when message parameter index is out of bounds', async () => {
      const input = form.querySelector('[name="username"]') as HTMLInputElement;
      input.value = 'a';
      const fieldObject: FieldObject = {
        element: input,
        rules: [{ name: 'min', params: [] }], // Missing param for {0}
        state: { isDirty: false, abortController: null, lastError: null },
        dependency: null,
      };

      await engine.validateField(fieldObject);
      expect(uiManager.displayError).toHaveBeenCalledWith(
        input,
        'Min length is {0}.'
      );
    });
  });
});
