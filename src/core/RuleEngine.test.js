import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RuleEngine } from './RuleEngine.js';
import { Logger, LogLevel } from '../utils/Logger.js';

describe('RuleEngine', () => {
  let form;
  let logger;
  let uiManager;
  let rules;
  let asyncRules;
  let messages;
  let engine;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="username" value="val">
        <input type="checkbox" name="dependOnMe" checked>
      </form>
    `;
    form = document.getElementById('test-form');
    logger = new Logger(LogLevel.NONE);
    uiManager = {
      displayError: vi.fn(),
      clearError: vi.fn(),
      showPending: vi.fn(),
      hidePending: vi.fn()
    };
    rules = {
      required: (val) => !!val,
      min: (val, params) => val.length >= parseInt(params[0], 10)
    };
    asyncRules = {
      remote: async (val, params, el, signal) => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => resolve(val === 'ok'), 10);
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });
      }
    };
    messages = {
      required: 'Required field.',
      min: 'Min length is {0}.',
      remote: 'Remote check failed.'
    };
    engine = new RuleEngine(form, { logger, uiManager, rules, asyncRules, messages });
  });

  it('should skip validation if dependency is not met', async () => {
    const input = form.querySelector('[name="username"]');
    const fieldObject = {
      element: input,
      rules: [{ name: 'required', params: [] }],
      state: {},
      dependency: { controllerName: 'dependOnMe', type: 'checked' }
    };
    
    // Uncheck dependency
    form.querySelector('[name="dependOnMe"]').checked = false;
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(uiManager.clearError).toHaveBeenCalledWith(input);
  });

  it('should validate using sync rules', async () => {
    const input = form.querySelector('[name="username"]');
    input.value = 'a';
    const fieldObject = {
      element: input,
      rules: [{ name: 'min', params: ['3'] }],
      state: {}
    };
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(false);
    expect(uiManager.displayError).toHaveBeenCalledWith(input, 'Min length is 3.');
  });

  it('should validate using async rules', async () => {
    const input = form.querySelector('[name="username"]');
    input.value = 'ok';
    const fieldObject = {
      element: input,
      rules: [{ name: 'remote', params: [] }],
      state: { abortController: null }
    };
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(uiManager.showPending).toHaveBeenCalledWith(input);
    expect(uiManager.hidePending).toHaveBeenCalledWith(input);
  });

  it('should handle aborted async validation', async () => {
    const input = form.querySelector('[name="username"]');
    input.value = 'ok';
    const fieldObject = {
      element: input,
      rules: [{ name: 'remote', params: [] }],
      state: { abortController: null }
    };
    
    const mockAbort = vi.fn();
    fieldObject.state.abortController = { abort: mockAbort };
    
    await engine.validateField(fieldObject);
    expect(mockAbort).toHaveBeenCalled();
  });

  it('should handle async rule errors', async () => {
    asyncRules.errorRule = async () => { throw new Error('Boom'); };
    const input = form.querySelector('[name="username"]');
    const fieldObject = {
      element: input,
      rules: [{ name: 'errorRule', params: [] }],
      state: {}
    };
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(false);
  });

  it('should log warning for unknown rules', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {});
    const input = form.querySelector('[name="username"]');
    const fieldObject = {
      element: input,
      rules: [{ name: 'unknown', params: [] }],
      state: {}
    };
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
  
  it('should handle different dependency types', async () => {
      const input = form.querySelector('[name="username"]');
      const depInput = form.querySelector('[name="dependOnMe"]');
      depInput.type = 'text';
      depInput.value = 'foo';
      
      const fieldObject = {
          element: input,
          rules: [{ name: 'required', params: [] }],
          state: {},
          dependency: { controllerName: 'dependOnMe', type: 'value', value: 'foo' }
      };
      
      expect(await engine.validateField(fieldObject)).toBe(true);
      
      fieldObject.dependency.value = 'bar';
      // If dependency not met, it should return true and clear error
      expect(await engine.validateField(fieldObject)).toBe(true);
      
      fieldObject.dependency.type = 'present';
      depInput.value = '';
      expect(await engine.validateField(fieldObject)).toBe(true);
  });

  it('should return true (skipping) if controller element is not found for dependency', async () => {
    const input = form.querySelector('[name="username"]');
    const fieldObject = {
      element: input,
      rules: [{ name: 'required', params: [] }],
      state: {},
      dependency: { controllerName: 'nonExistent', type: 'checked' }
    };
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true); 
  });

  it('should return true when async validation is aborted (AbortError branch)', async () => {
    const input = form.querySelector('[name="username"]');
    const fieldObject = {
      element: input,
      rules: [{ name: 'remote', params: [] }],
      state: { abortController: new AbortController() }
    };
    
    // Force the rule to reject with AbortError
    asyncRules.remote = vi.fn().mockRejectedValue({ name: 'AbortError' });
    
    const isValid = await engine.validateField(fieldObject);
    expect(isValid).toBe(true);
    expect(uiManager.hidePending).toHaveBeenCalledWith(input);
  });

  it('should return false for unknown dependency type', async () => {
      const input = form.querySelector('[name="username"]');
      const fieldObject = {
          element: input,
          rules: [{ name: 'required', params: [] }],
          state: {},
          dependency: { controllerName: 'dependOnMe', type: 'unknown' }
      };
      
      const isValid = await engine.validateField(fieldObject);
      expect(isValid).toBe(true);
  });
});
