import { en } from './locales/en';

export type LocaleDictionary = Record<string, string>;

/**
 * Handles internationalization and message interpolation for Ctrovalidate.
 */
export class Translator {
  #locales: Record<string, LocaleDictionary> = { en };
  #currentLocale: string = 'en';

  /**
   * Set the current locale.
   */
  setLocale(locale: string): void {
    if (!this.#locales[locale]) {
      console.warn(
        `[Ctrovalidate] Locale "${locale}" not found. Falling back to "en".`
      );
      this.#currentLocale = 'en';
      return;
    }
    this.#currentLocale = locale;
  }

  /**
   * Add or update messages for a specific locale.
   */
  addMessages(locale: string, messages: LocaleDictionary): void {
    this.#locales[locale] = {
      ...(this.#locales[locale] || {}),
      ...messages,
    };
  }

  /**
   * Translates a rule name with optional parameters.
   */
  translate(
    rule: string,
    params: unknown[] = [],
    localeOverride?: string
  ): string {
    const locale = localeOverride || this.#currentLocale;
    const dictionary = this.#locales[locale] || this.#locales['en'];
    const template =
      dictionary[rule] || dictionary['default'] || 'Invalid input.';

    return template.replace(/{(\d+)}/g, (match, index) => {
      const paramIndex = parseInt(index, 10);
      return params[paramIndex] !== undefined
        ? String(params[paramIndex])
        : match;
    });
  }

  /**
   * Get the current active locale.
   */
  get currentLocale(): string {
    return this.#currentLocale;
  }
}

// Global default translator instance
export const translator = new Translator();
