// src/dom/UIManager.js

/**
 * @file This file defines the UIManager class, which is responsible for all direct interactions with the DOM.
 * This version is upgraded to automatically manage ARIA attributes for accessibility (a11y)
 * and to handle the "pending" state for asynchronous validations.
 */

/**
 * @class UIManager
 * @description Manages all visual feedback and ARIA attributes on the web page.
 */
export class UIManager {
  /**
   * The CSS class to apply to an input field when it's invalid.
   * @private
   * @type {string}
   */
  #errorClass;

  /**
   * The CSS class for the element that displays the error message.
   * @private
   * @type {string}
   */
  #errorMessageClass;

  /**
   * The CSS class to apply to an input field during an async validation.
   * @private
   * @type {string}
   */
  #pendingClass;

  /**
   * A cache to store references to error elements, preventing repeated DOM queries.
   * @private
   * @type {WeakMap<HTMLInputElement, HTMLElement>}
   */
  #errorElementCache = new WeakMap();

  /**
   * @constructor
   * @param {object} options - Configuration options from the main Ctrovalidate instance.
   */
  constructor({ errorClass, errorMessageClass, pendingClass }) {
    this.#errorClass = errorClass;
    this.#errorMessageClass = errorMessageClass;
    this.#pendingClass = pendingClass;
  }

  /**
   * Finds or creates the dedicated error message container for a given input field.
   * @private
   * @param {HTMLInputElement} field - The input field.
   * @returns {HTMLElement | null} The found error element.
   */
  #findErrorElement(field) {
    if (this.#errorElementCache.has(field)) {
      return this.#errorElementCache.get(field);
    }

    // Find the error element, assuming it's a sibling or within the parent.
    const errorElement = field.parentElement.querySelector(
      `.${this.#errorMessageClass}`
    );

    if (errorElement) {
      // Ensure the error element has a unique ID for ARIA.
      if (!errorElement.id) {
        // Generate a unique ID based on the field's name or a random string.
        errorElement.id = `ctrovalidate-error-${field.name || Math.random().toString(36).substring(2, 9)}`;
      }
      this.#errorElementCache.set(field, errorElement);
    }

    return errorElement;
  }

  /**
   * Displays a validation error message and applies error styling and ARIA attributes.
   * @param {HTMLInputElement} field - The field that has an error.
   * @param {string} message - The error message to display.
   */
  displayError(field, message) {
    const errorElement = this.#findErrorElement(field);

    field.classList.add(this.#errorClass);
    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = '';
      // Link the field to its error message for screen readers.
      field.setAttribute('aria-describedby', errorElement.id);
    }
  }

  /**
   * Clears the validation error message, styling, and ARIA attributes.
   * @param {HTMLInputElement} field - The field to clear the error from.
   */
  clearError(field) {
    const errorElement = this.#findErrorElement(field);

    field.classList.remove(this.#errorClass);
    field.removeAttribute('aria-invalid');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      // Unlink the field from its error message.
      field.removeAttribute('aria-describedby');
    }
  }

  /**
   * Shows the pending state for a field undergoing asynchronous validation.
   * @param {HTMLInputElement} field - The field to show the pending state for.
   */
  showPending(field) {
    this.clearError(field); // Clear previous errors before showing pending.
    field.classList.add(this.#pendingClass);
  }

  /**
   * Hides the pending state for a field after an asynchronous validation is complete.
   * @param {HTMLInputElement} field - The field to hide the pending state from.
   */
  hidePending(field) {
    field.classList.remove(this.#pendingClass);
  }
}
