import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Ctrovalidate } from './Ctrovalidate.js';
import { LogLevel } from '../utils/Logger.js';

describe('Ctrovalidate', () => {
  let form;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="username" data-ctrovalidate-rules="required">
        <input type="email" name="email" data-ctrovalidate-rules="required|email">
      </form>
    `;
    form = document.getElementById('test-form');
  });

  describe('Initialization', () => {
    it('should throw an error if no form element is provided', () => {
      // @ts-ignore
      expect(() => new Ctrovalidate()).toThrow('Ctrovalidate requires a valid HTMLFormElement to be initialized.');
    });

    it('should throw an error if provided element is not a FORM', () => {
      const div = document.createElement('div');
      expect(() => new Ctrovalidate(div)).toThrow('Ctrovalidate requires a valid HTMLFormElement to be initialized.');
    });

    it('should initialize correctly with valid form and default options', () => {
      const validator = new Ctrovalidate(form);
      expect(validator).toBeDefined();
    });

    it('should initialize with custom options', () => {
      const options = {
        logLevel: LogLevel.DEBUG,
        errorClass: 'custom-error',
        realTime: false
      };
      const validator = new Ctrovalidate(form, options);
      expect(validator).toBeDefined();
    });
  });

  describe('Validation Methods', () => {
    it('should validate the entire form and return true if all fields are valid', async () => {
      const validator = new Ctrovalidate(form);
      form.querySelector('[name="username"]').value = 'testuser';
      form.querySelector('[name="email"]').value = 'test@example.com';
      
      const isValid = await validator.validate();
      expect(isValid).toBe(true);
    });

    it('should return false if any field is invalid', async () => {
      const validator = new Ctrovalidate(form);
      form.querySelector('[name="username"]').value = ''; // Required field
      
      const isValid = await validator.validate();
      expect(isValid).toBe(false);
    });
  });

  describe('Dynamic Fields', () => {
    it('should add a field dynamically', async () => {
      const validator = new Ctrovalidate(form);
      const newInput = document.createElement('input');
      newInput.name = 'newField';
      newInput.setAttribute('data-ctrovalidate-rules', 'required');
      form.appendChild(newInput);
      
      validator.addField(newInput);
      
      const isValid = await validator.validate();
      expect(isValid).toBe(false); // Because newField is required and empty
      
      newInput.value = 'some value';
      form.querySelector('[name="username"]').value = 'testuser';
      form.querySelector('[name="email"]').value = 'test@example.com';
      
      const isValidNow = await validator.validate();
      expect(isValidNow).toBe(true);
    });

    it('should remove a field dynamically', async () => {
      const validator = new Ctrovalidate(form);
      const emailInput = form.querySelector('[name="email"]');
      
      validator.removeField(emailInput);
      
      form.querySelector('[name="username"]').value = 'testuser';
      // email is empty but was removed, so it shouldn't affect validation
      const isValid = await validator.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Static Extension Methods', () => {
    it('should add a custom rule via static addRule', async () => {
      const ruleName = 'isEven';
      const logic = (val) => Number(val) % 2 === 0;
      const message = 'Value must be even';
      
      Ctrovalidate.addRule(ruleName, logic, message);
      
      const input = document.createElement('input');
      input.name = 'numberField';
      input.value = '3';
      input.setAttribute('data-ctrovalidate-rules', 'isEven');
      form.appendChild(input);
      
      const validator = new Ctrovalidate(form);
      const isValid = await validator.validate();
      expect(isValid).toBe(false);
    });

    it('should log an error if addRule is called with invalid parameters', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      // @ts-ignore
      Ctrovalidate.addRule(null, null, null);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should add an async rule via static addAsyncRule', async () => {
        const ruleName = 'checkRemote';
        const logic = async (val) => {
            return new Promise(resolve => setTimeout(() => resolve(val === 'ok'), 10));
        };
        const message = 'Remote check failed';
        
        Ctrovalidate.addAsyncRule(ruleName, logic, message);
        
        const input = document.createElement('input');
        input.name = 'remoteField';
        input.value = 'not-ok';
        input.setAttribute('data-ctro-rules', 'checkRemote');
        form.appendChild(input);
        
        const validator = new Ctrovalidate(form);
        const isValid = await validator.validate();
        expect(isValid).toBe(false);
    });

    it('should log an error if addAsyncRule is called with invalid parameters', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        // @ts-ignore
        Ctrovalidate.addAsyncRule(null, null, null);
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
  });
});
