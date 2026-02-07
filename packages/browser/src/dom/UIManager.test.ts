import { describe, it, expect, beforeEach } from 'vitest';
import { UIManager } from './UIManager';

describe('UIManager', () => {
  let form: HTMLFormElement;
  let input: HTMLInputElement;
  let errorElement: HTMLElement;
  let uiManager: UIManager;

  // Set up the DOM environment before each test
  beforeEach(() => {
    // Create a mock form structure in jsdom
    document.body.innerHTML = `
      <form>
        <div>
          <input type="text" name="username" />
          <div class="error-message"></div>
        </div>
      </form>
    `;
    form = document.querySelector('form')!;
    input = form.querySelector('input')!;
    errorElement = form.querySelector('.error-message')!;

    // Initialize UIManager with standard options
    uiManager = new UIManager({
      errorClass: 'is-invalid',
      errorMessageClass: 'error-message',
      pendingClass: 'is-validating',
    });
  });

  it('should display an error message and set ARIA attributes', () => {
    const errorMessage = 'This field is required.';
    uiManager.displayError(input, errorMessage);

    // Check for visual class
    expect(input.classList.contains('is-invalid')).toBe(true);

    // Check for error message content
    expect(errorElement.textContent).toBe(errorMessage);
    expect(errorElement.style.display).not.toBe('none');

    // Check for ARIA attributes
    expect(input.getAttribute('aria-invalid')).toBe('true');

    // Check that the error element has an ID and the input is described by it
    const errorId = errorElement.id;
    expect(errorId).not.toBeNull();
    expect(errorId).toContain('ctrovalidate-error-');
    expect(input.getAttribute('aria-describedby')).toBe(errorId);
  });

  it('should clear an error message and remove ARIA attributes', () => {
    // First, set an error state
    uiManager.displayError(input, 'An error');

    // Now, clear it
    uiManager.clearError(input);

    // Check that visual class is removed
    expect(input.classList.contains('is-invalid')).toBe(false);

    // Check that error message is cleared
    expect(errorElement.textContent).toBe('');
    expect(errorElement.style.display).toBe('none');

    // Check that ARIA attributes are removed
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(input.hasAttribute('aria-describedby')).toBe(false);
  });

  it('should show and hide the pending state', () => {
    uiManager.showPending(input);
    expect(input.classList.contains('is-validating')).toBe(true);

    uiManager.hidePending(input);
    expect(input.classList.contains('is-validating')).toBe(false);
  });

  it('should clear existing errors when showing the pending state', () => {
    // Set an error state
    uiManager.displayError(input, 'An error');
    expect(input.classList.contains('is-invalid')).toBe(true);
    expect(input.hasAttribute('aria-invalid')).toBe(true);

    // Show pending state
    uiManager.showPending(input);

    // Check that error state is gone and pending state is active
    expect(input.classList.contains('is-invalid')).toBe(false);
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(input.classList.contains('is-validating')).toBe(true);
  });

  it('should reuse cached error element and preserve ID', () => {
    uiManager.displayError(input, 'Error 1');
    const firstId = errorElement.id;

    uiManager.displayError(input, 'Error 2');
    expect(errorElement.id).toBe(firstId);
  });

  it('should handle missing error element gracefully', () => {
    document.body.innerHTML = `<div><input type="text" name="noError" /></div>`;
    const noErrorInput = document.querySelector('input');

    // Should not throw
    uiManager.displayError(noErrorInput!, 'Some error');
    expect(noErrorInput!.classList.contains('is-invalid')).toBe(true);

    uiManager.clearError(noErrorInput!);
    expect(noErrorInput!.classList.contains('is-invalid')).toBe(false);
  });

  it('should not overwrite existing error element ID', () => {
    errorElement.id = 'existing-id';
    uiManager.displayError(input, 'Error');
    expect(errorElement.id).toBe('existing-id');
    expect(input.getAttribute('aria-describedby')).toBe('existing-id');
  });

  it('should generate random ID if field name is missing', () => {
    input.removeAttribute('name');
    uiManager.displayError(input, 'Error');
    expect(errorElement.id).toContain('ctrovalidate-error-');
  });

  it('should not throw if element has no parent', () => {
    const orphan = document.createElement('input');
    // Calling displayError on an orphan element triggers the parentElement null check internally
    uiManager.displayError(orphan, 'Error');
    expect(orphan.classList.contains('is-invalid')).toBe(true);
  });

  it('should handle space-separated class strings correctly', () => {
    const multiClassManager = new UIManager({
      errorClass: 'border-red-500 bg-red-50',
      pendingClass: 'opacity-50 animate-pulse',
    });

    // Display error
    multiClassManager.displayError(input, 'Error');
    expect(input.classList.contains('border-red-500')).toBe(true);
    expect(input.classList.contains('bg-red-50')).toBe(true);

    // Clear error
    multiClassManager.clearError(input);
    expect(input.classList.contains('border-red-500')).toBe(false);
    expect(input.classList.contains('bg-red-50')).toBe(false);

    // Show pending
    multiClassManager.showPending(input);
    expect(input.classList.contains('opacity-50')).toBe(true);
    expect(input.classList.contains('animate-pulse')).toBe(true);
  });
});
