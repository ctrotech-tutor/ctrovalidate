import './style.css'
import Alpine from 'alpinejs'
import { Ctrovalidate } from 'ctrovalidate'

// Initialize Alpine
window.Alpine = Alpine
Alpine.start()

// Initialize Validator
const form = document.getElementById('quote-form') as HTMLFormElement;
window.validator = new Ctrovalidate(form, {
  realTime: true,
  errorClass: 'border-red-500 bg-red-50 text-red-900',
  pendingClass: 'opacity-50',
});

// Expose validator globally for the inline HTML scripts to access
declare global {
  interface Window {
    Alpine: any;
    validator: Ctrovalidate;
  }
}
