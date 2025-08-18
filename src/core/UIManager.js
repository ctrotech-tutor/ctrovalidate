// src/core/UIManager.js

/**
 * @file This file defines the UIManager class, which is responsible for all direct interactions with the DOM.
 * I've created this as a dedicated "DOM layer" to keep our core validation logic pure and separate
 * from the complexities of web page manipulation. This version is now upgraded to handle the "pending"
 * state for asynchronous validations.
 */

/**
 * @class UIManager
 * @description Manages all visual feedback on the web page.
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
   * A cache to store references to error elements, preventing repeated DOM queries for the same field.
   * This is a key performance optimization.
   * @private
   * @type {WeakMap<HTMLInputElement, HTMLElement>}
   */
  #errorElementCache = new WeakMap();

  /**
   * @constructor
   * @param {object} options - Configuration options from the main Validator instance.
   * @param {string} options.errorClass - The CSS class for an invalid field.
   * @param {string} options.errorMessageClass - The CSS class to identify error message containers.
   * @param {string} options.pendingClass - The CSS class for a field with a pending async validation.
   */
  constructor({ errorClass, errorMessageClass, pendingClass }) {
    this.#errorClass = errorClass;
    this.#errorMessageClass = errorMessageClass;
    this.#pendingClass = pendingClass;
  }

  /**
   * Finds the dedicated error message container for a given input field.
   * To make this fast and flexible, I'm using a specific search strategy:
   * 1. First, I check if we've found this element before and cached it.
   * 2. If not, I look for a sibling element with the configured error message class.
   * This is a common and reliable pattern.
   * @private
   * @param {HTMLInputElement} field - The input field to find the error container for.
   * @returns {HTMLElement | null} The found error element, or null if it doesn't exist.
   */
  #findErrorElement(field) {
    if (this.#errorElementCache.has(field)) {
      return this.#errorElementCache.get(field);
    }

    const errorElement = field.parentElement.querySelector(`.${this.#errorMessageClass}`);

    if (errorElement) {
      this.#errorElementCache.set(field, errorElement);
    }

    return errorElement;
  }

  /**
   * Displays a validation error message for a specific field and applies error styling.
   * This is the primary method for providing visual feedback to the user.
   * @param {HTMLInputElement} field - The field that has an error.
   * @param {string} message - The error message to display.
   */
  displayError(field, message) {
    const errorElement = this.#findErrorElement(field);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = '';
    }

    field.classList.add(this.#errorClass);
  }

  /**
   * Clears the validation error message and removes error styling for a specific field.
   * This is called when a field becomes valid.
   * @param {HTMLInputElement} field - The field to clear the error from.
   */
  clearError(field) {
    const errorElement = this.#findErrorElement(field);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }

    field.classList.remove(this.#errorClass);
  }

  /**
   * Shows the pending state for a field undergoing asynchronous validation.
   * I'm making sure to clear any previous errors first to avoid a confusing UI state.
   * @param {HTMLInputElement} field - The field to show the pending state for.
   */
  showPending(field) {
    // It's crucial to clear any existing error state before showing the pending state.
    this.clearError(field);
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
