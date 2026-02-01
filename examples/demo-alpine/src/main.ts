import './style.css';
import Alpine from 'alpinejs';
import { Ctrovalidate } from 'ctrovalidate';

// Extend Window interface for Alpine
declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
  Alpine.data('formHandler', () => ({
    contactMethod: 'email',
    validator: null as Ctrovalidate | null,

    init() {
      // Initialize Custom Rules
      Ctrovalidate.addRule(
        'strongPassword',
        (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value as string),
        'Use at least 8 characters with upper, lower, and numeric values.'
      );

      Ctrovalidate.addAsyncRule(
        'usernameAvailable',
        async (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const reserved = ['admin', 'root', 'ctrotech'];
              resolve(!reserved.includes((value as string).toLowerCase()));
            }, 1000);
          });
        },
        'This username is already reserved by the system.'
      );

      // Initialize Validator on the form
      const form = document.querySelector<HTMLFormElement>('#showcase-form');
      if (form) {
        this.validator = new Ctrovalidate(form, {
          logLevel: Ctrovalidate.LogLevel.DEBUG,
          realTime: true,
          pendingClass: 'is-validating',
        });
      }
    },

    async submitForm() {
      console.log('--- ALPINE SUBMISSION INITIATED ---');
      if (this.validator) {
        const isValid = await this.validator.validate();

        if (isValid) {
          console.log('✅ VALIDATION SUCCESS');
          alert('🚀 Registration successful! (Alpine JS Demo)');
          const form = document.querySelector<HTMLFormElement>('#showcase-form');
          if (form) {
            const data = Object.fromEntries(new FormData(form).entries());
            console.table(data);
          }
        } else {
          console.warn('❌ VALIDATION FAILURE');
        }
      }
    },
  }));
});

Alpine.start();
