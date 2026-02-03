// src/dom/UIManager.ts

import { CtrovalidateOptions } from '../types/index';

/**
 * Manages all visual feedback and ARIA attributes on the web page.
 */
export class UIManager {
  #errorClass: string;
  #errorMessageClass: string;
  #pendingClass: string;

  /**
   * A cache to store references to error elements, preventing repeated DOM queries.
   */
  #errorElementCache: WeakMap<HTMLElement, HTMLElement> = new WeakMap();

  /**
   * @param options - Configuration options.
   */
  constructor({
    errorClass = 'ctrovalidate-error',
    errorMessageClass = 'ctrovalidate-error-message',
    pendingClass = 'ctrovalidate-pending',
  }: CtrovalidateOptions) {
    this.#errorClass = errorClass;
    this.#errorMessageClass = errorMessageClass;
    this.#pendingClass = pendingClass;
  }

  /**
   * Finds or creates the dedicated error message container for a given input field.
   */
  #findErrorElement(field: HTMLElement): HTMLElement | null {
    if (this.#errorElementCache.has(field)) {
      return this.#errorElementCache.get(field) || null;
    }

    if (!field.parentElement) return null;

    // Create a valid CSS selector by escaping and chaining all classes
    const safeEscape = (str: string): string => {
      if (typeof CSS !== 'undefined' && CSS.escape) {
        return CSS.escape(str);
      }
      // Basic fallback for Node/JSDOM environments where CSS is not defined
      return str.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g, '\\$1');
    };

    const selector = this.#errorMessageClass
      .split(/\s+/)
      .filter(Boolean)
      .map((cls) => `.${safeEscape(cls)}`)
      .join('');

    const errorElement = field.parentElement.querySelector(
      selector
    ) as HTMLElement | null;

    if (errorElement) {
      if (!errorElement.id) {
        errorElement.id = `ctrovalidate-error-${(field as any).name || Math.random().toString(36).substring(2, 9)}`;
      }
      this.#errorElementCache.set(field, errorElement);
    }

    return errorElement;
  }

  /**
   * Displays a validation error message and applies error styling and ARIA attributes.
   */
  /**
   * Displays a validation error message and applies error styling and ARIA attributes.
   */
  displayError(field: HTMLElement, message: string): void {
    const errorElement = this.#findErrorElement(field);

    field.classList.add(...this.#errorClass.split(/\s+/).filter(Boolean));
    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = '';
      field.setAttribute('aria-describedby', errorElement.id);
    }
  }

  /**
   * Clears the validation error message, styling, and ARIA attributes.
   */
  clearError(field: HTMLElement): void {
    const errorElement = this.#findErrorElement(field);

    field.classList.remove(...this.#errorClass.split(/\s+/).filter(Boolean));
    field.removeAttribute('aria-invalid');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      field.removeAttribute('aria-describedby');
    }
  }

  /**
   * Shows the pending state for a field undergoing asynchronous validation.
   */
  showPending(field: HTMLElement): void {
    this.clearError(field);
    field.classList.add(...this.#pendingClass.split(/\s+/).filter(Boolean));
  }

  /**
   * Hides the pending state for a field after an asynchronous validation is complete.
   */
  hidePending(field: HTMLElement): void {
    field.classList.remove(...this.#pendingClass.split(/\s+/).filter(Boolean));
  }
}
