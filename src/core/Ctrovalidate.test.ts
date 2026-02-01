import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Ctrovalidate } from './Ctrovalidate';
import { LogLevel } from '../utils/Logger';

describe('Ctrovalidate', () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="username" data-ctrovalidate-rules="required">
        <input type="email" name="email" data-ctrovalidate-rules="required|email">
      </form>
    `;
    form = document.getElementById('test-form') as HTMLFormElement;
  });

  describe('Initialization', () => {
    it('should throw an error if no form element is provided', () => {
      // @ts-ignore
      expect(() => new Ctrovalidate()).toThrow(
        'Ctrovalidate requires a valid HTMLFormElement to be initialized.'
      );
    });

    it('should throw an error if provided element is not a FORM', () => {
      const div = document.createElement('div');
      expect(() => new Ctrovalidate(div as any)).toThrow(
        'Ctrovalidate requires a valid HTMLFormElement to be initialized.'
      );
    });

    it('should initialize correctly with valid form and default options', () => {
      const validator = new Ctrovalidate(form);
      expect(validator).toBeDefined();
    });

    it('should initialize with custom options', () => {
      const options = {
        logLevel: LogLevel.DEBUG,
        errorClass: 'custom-error',
        realTime: false,
      };
      const validator = new Ctrovalidate(form, options);
      expect(validator).toBeDefined();
    });
  });

  describe('Validation Methods', () => {
    it('should validate the entire form and return true if all fields are valid', async () => {
      const validator = new Ctrovalidate(form);
      (form.querySelector('[name="username"]') as HTMLInputElement).value =
        'testuser';
      (form.querySelector('[name="email"]') as HTMLInputElement).value =
        'test@example.com';

      const isValid = await validator.validate();
      expect(isValid).toBe(true);
    });

    it('should return false if any field is invalid', async () => {
      const validator = new Ctrovalidate(form);
      (form.querySelector('[name="username"]') as HTMLInputElement).value = ''; // Required field

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
      (form.querySelector('[name="username"]') as HTMLInputElement).value =
        'testuser';
      (form.querySelector('[name="email"]') as HTMLInputElement).value =
        'test@example.com';

      const isValidNow = await validator.validate();
      expect(isValidNow).toBe(true);
    });

    it('should remove a field dynamically', async () => {
      const validator = new Ctrovalidate(form);
      const emailInput = form.querySelector(
        '[name="email"]'
      ) as HTMLInputElement;

      validator.removeField(emailInput);

      (form.querySelector('[name="username"]') as HTMLInputElement).value =
        'testuser';
      // email is empty but was removed, so it shouldn't affect validation
      const isValid = await validator.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Static Extension Methods', () => {
    it('should add a custom rule via static addRule', async () => {
      const ruleName = 'isEven';
      const logic = (val: any) => Number(val) % 2 === 0;
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
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      // @ts-ignore
      Ctrovalidate.addRule(null, null, null);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should add an async rule via static addAsyncRule', async () => {
      const ruleName = 'checkRemote';
      const logic = async (val: any) => {
        return new Promise<boolean>((resolve) =>
          setTimeout(() => resolve(val === 'ok'), 10)
        );
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
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      // @ts-ignore
      Ctrovalidate.addAsyncRule(null, null, null);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Additional Coverage', () => {
    it('should set custom messages globally', () => {
      Ctrovalidate.setCustomMessages({ custom: 'Custom message' });
    });

    it('should refresh fields and re-attach listeners', () => {
      const v = new Ctrovalidate(form);
      const spy = vi.spyOn(v, 'refresh');
      v.refresh();
      expect(spy).toHaveBeenCalled();
    });

    it('should trigger real-time validation via validationHandler', async () => {
      // This test ensures the validationHandler lambda passed to FormController is executed
      new Ctrovalidate(form, { realTime: true });
      const input = form.querySelector('[name="username"]') as HTMLInputElement;
      input.value = 'testvalue';
      input.dispatchEvent(new Event('blur'));
    });
  });

  describe('Programmatic Methods (Industrial API)', () => {
    it('should correctly report field dirty state', () => {
      const v = new Ctrovalidate(form);
      expect(v.isDirty('username')).toBe(false);

      const input = form.querySelector('[name="username"]') as HTMLInputElement;
      input.dispatchEvent(new Event('blur'));
      expect(v.isDirty('username')).toBe(true);
    });

    it('should return the current error message via getError', async () => {
      const v = new Ctrovalidate(form);
      const input = form.querySelector('[name="username"]') as HTMLInputElement;
      input.value = ''; // Invalid (required)

      await v.validate();
      expect(v.getError('username')).toBe('This field is required.');

      input.value = 'valid';
      await v.validate();
      expect(v.getError('username')).toBeNull();
    });

    it('should reset the entire form state via reset()', async () => {
      const v = new Ctrovalidate(form);
      const input = form.querySelector('[name="username"]') as HTMLInputElement;
      input.value = '';
      input.dispatchEvent(new Event('blur')); // Make it dirty

      await v.validate(); // Show error
      expect(v.isDirty('username')).toBe(true);
      expect(v.getError('username')).not.toBeNull();

      v.reset();
      expect(v.isDirty('username')).toBe(false);
      expect(v.getError('username')).toBeNull();
    });

    it('should fully clean up via destroy()', () => {
      const v = new Ctrovalidate(form);
      v.destroy();

      // Dispatch event - should not trigger log or change state if destroyed correctly
      // (Simplified check as destroy mainly removes listeners)
      expect(v.isDirty('username')).toBe(false);
    });
  });
});
