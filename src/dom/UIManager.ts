// src/dom/UIManager.ts

import { CtrovalidateOptions } from '../types/index';

/**
 * Manages all visual feedback and ARIA attributes on the web page.
 * - Supports space-separated class lists for error/pending elements (Tailwind-safe).
 * - Safely escapes selectors for querySelector (handles [..] tailwind tokens).
 * - Caches found error elements with a WeakMap.
 * - Creates a fallback error element when none exists.
 */
export class UIManager {
  #errorClass: string;
  #errorMessageClass: string;
  #pendingClass: string;

  // Cache field -> found error element
  #errorElementCache: WeakMap<HTMLElement, HTMLElement> = new WeakMap();

  // Optional map to store generated IDs per field when we create an element
  #generatedIdMap: WeakMap<HTMLElement, string> = new WeakMap();

  // Global unique id counter for fallback ids
  static #uniqueIdCounter = 0;

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
   * Safely escape a class name for use in querySelector.
   * Uses CSS.escape when available, otherwise falls back to a robust regex.
   */
  #safeEscape(str: string): string {
    if (
      typeof CSS !== 'undefined' &&
      typeof (CSS as any).escape === 'function'
    ) {
      return (CSS as any).escape(str);
    }
    // Fallback escape for environments without CSS.escape (JSDOM/Node)
    return str.replace(/([!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~\[\]])/g, '\\$1');
  }

  /**
   * Build a DOM id from the field (name if available) or a generated counter.
   */
  #buildIdForField(field: HTMLElement): string {
    const name = (field as any).name;
    if (typeof name === 'string' && name.trim().length > 0) {
      // sanitize name for id use
      return `ctrovalidate-error-${name.replace(/\s+/g, '-').replace(/[^A-Za-z0-9\-_:.]/g, '')}`;
    }
    const id = `ctrovalidate-error-${UIManager.#uniqueIdCounter++}`;
    this.#generatedIdMap.set(field, id);
    return id;
  }

  /**
   * Finds (or creates) the dedicated error message container for a given input field.
   * Supports multiple classes in `errorMessageClass` by trying each class individually.
   */
  #findErrorElement(field: HTMLElement): HTMLElement | null {
    if (this.#errorElementCache.has(field)) {
      return this.#errorElementCache.get(field) || null;
    }

    const parent = field.parentElement;
    if (!parent) return null;

    const classes = this.#errorMessageClass.split(/\s+/).filter(Boolean);

    // Try to find an element matching any single class from the configured list.
    for (const cls of classes) {
      const selector = `.${this.#safeEscape(cls)}`;
      const found = parent.querySelector(selector) as HTMLElement | null;
      if (found) {
        if (!found.id) {
          found.id = this.#buildIdForField(field);
        }
        this.#errorElementCache.set(field, found);
        return found;
      }
    }

    // If nothing found, create a fallback element (helps when authors forget the container).
    // The created element receives all classes in errorMessageClass.
    const created = document.createElement('div');
    created.className = classes.join(' ');
    created.style.display = 'none';
    created.role = 'status'; // assistive tech friendly
    created.setAttribute('aria-live', 'polite');

    const id = this.#buildIdForField(field);
    created.id = id;

    // Insert after the field if possible, otherwise append to parent.
    try {
      // place right after the field for predictable layout
      field.insertAdjacentElement('afterend', created);
    } catch {
      parent.appendChild(created);
    }

    this.#errorElementCache.set(field, created);
    return created;
  }

  /**
   * Display a validation error message for the given field.
   * Applies configured error classes and ARIA attributes.
   */
  displayError(field: HTMLElement, message: string): void {
    const errorElement = this.#findErrorElement(field);

    // Apply all errorClass tokens (supports multiple space-separated Tailwind classes)
    this.#errorClass
      .split(/\s+/)
      .filter(Boolean)
      .forEach((cls) => field.classList.add(cls));

    // ARIA: mark invalid (string is correct value for attribute)
    field.setAttribute('aria-invalid', 'true');

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = '';
      field.setAttribute('aria-describedby', errorElement.id);
    }
  }

  /**
   * Clear the validation error message and related styling/ARIA attributes.
   */
  clearError(field: HTMLElement): void {
    const errorElement = this.#findErrorElement(field);

    // Remove all error classes
    this.#errorClass
      .split(/\s+/)
      .filter(Boolean)
      .forEach((cls) => field.classList.remove(cls));

    field.removeAttribute('aria-invalid');

    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      // Only remove aria-describedby if it references this error element
      const described = field.getAttribute('aria-describedby');
      if (described === errorElement.id) {
        field.removeAttribute('aria-describedby');
      }
    }
  }

  /**
   * Show pending state for a field (async validation).
   */
  showPending(field: HTMLElement): void {
    // Clear errors when pending
    this.clearError(field);

    this.#pendingClass
      .split(/\s+/)
      .filter(Boolean)
      .forEach((cls) => field.classList.add(cls));
  }

  /**
   * Hide pending state for a field.
   */
  hidePending(field: HTMLElement): void {
    this.#pendingClass
      .split(/\s+/)
      .filter(Boolean)
      .forEach((cls) => field.classList.remove(cls));
  }
}
