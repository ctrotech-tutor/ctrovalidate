import { describe, it, expect, beforeEach } from 'vitest';
import { Ctrovalidate } from './Ctrovalidate';

describe('Ctrovalidate Hybrid Schema', () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="test-form">
        <input type="text" name="email" id="email-field" data-ctrovalidate-rules="required">
        <input type="text" name="username" id="username-field">
      </form>
    `;
    form = document.getElementById('test-form') as HTMLFormElement;
  });

  it('should merge HTML rules with Schema rules', async () => {
    // email has "required" in HTML. We add "email" in schema.
    const validator = new Ctrovalidate(form, {
      schema: {
        email: 'email',
        username: 'required|minLength:5',
      },
      logLevel: 0,
    });

    const emailField = document.getElementById(
      'email-field'
    ) as HTMLInputElement;
    const usernameField = document.getElementById(
      'username-field'
    ) as HTMLInputElement;

    // Email should fail both required (HTML) and email (Schema)
    emailField.value = '';
    let isValid = await validator.validateForm();
    expect(isValid).toBe(false);
    expect(validator.getError('email')).toBe('This field is required.');

    emailField.value = 'not-an-email';
    isValid = await validator.validateForm();
    expect(isValid).toBe(false);
    expect(validator.getError('email')).toBe(
      'Please enter a valid email address.'
    );

    // Username (Schema only)
    usernameField.value = 'abc';
    isValid = await validator.validateForm();
    expect(isValid).toBe(false);
    expect(validator.getError('username')).toBe(
      'This field must be at least 5 characters long.'
    );

    // Both valid
    emailField.value = 'test@example.com';
    usernameField.value = 'validuser';
    isValid = await validator.validateForm();
    expect(isValid).toBe(true);
  });

  it('should support hybrid array formats in schema for best DX', async () => {
    const validator = new Ctrovalidate(form, {
      schema: {
        username: ['required', { name: 'minLength', params: ['10'] }],
      },
    });

    const usernameField = document.getElementById(
      'username-field'
    ) as HTMLInputElement;
    usernameField.value = 'short';

    const isValid = await validator.validateForm();
    expect(isValid).toBe(false);
    expect(validator.getError('username')).toBe(
      'This field must be at least 10 characters long.'
    );
  });
});
