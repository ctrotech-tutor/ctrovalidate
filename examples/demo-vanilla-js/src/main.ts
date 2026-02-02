import './style.css';
import { Ctrovalidate } from 'ctrovalidate';

const validator = Ctrovalidate;

// Initialize Custom Rules
validator.addRule(
  'strongPassword',
  (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/.test(value as string),
  'Use at least 10 characters with upper, lower, and numeric values for you.'
);

validator.addAsyncRule(
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

// Initialize Validator
const form = document.querySelector<HTMLFormElement>('#showcase-form');
if (form) {
  const validator = new Ctrovalidate(form, {
    logLevel: Ctrovalidate.LogLevel.DEBUG,
    realTime: true,
    pendingClass: 'is-validating',
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('--- VITE VANILLA SUBMISSION ---');

    const isValid = await validator.validate();

    if (isValid) {
      console.log('✅ VALIDATION SUCCESS');
      alert('🚀 Registration successful! (Vite + Vanilla JS Demo)');
      const data = Object.fromEntries(new FormData(form).entries());
      console.table(data);
    } else {
      console.warn('❌ VALIDATION FAILURE');
    }
  });
}
