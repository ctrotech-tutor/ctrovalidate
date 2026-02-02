import './style.css';
import { Ctrovalidate, LogLevel } from 'ctrovalidate';

/**
 * =============================================================================
 * CTROVALIDATE v3.0.0 - COMPLETE FEATURE SHOWCASE
 * =============================================================================
 * This demo demonstrates EVERY feature of the Ctrovalidate library:
 * - All 21 built-in validation rules
 * - All 9 public API methods
 * - All 5 configuration options
 * - Advanced features: async validation, dependencies, custom rules, state inspection
 * =============================================================================
 */

// =============================================================================
// 1. CUSTOM VALIDATION RULES
// =============================================================================

/**
 * CUSTOM RULE: strongPassword
 * Real-world use case: Enforce strong password policy
 * Requirements: Min 8 chars, uppercase, lowercase, number, special character
 */
Ctrovalidate.addRule(
  'strongPassword',
  (value) => {
    const password = value as string;
    if (!password) return false;

    // Check all requirements
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
  },
  'Password must be at least 8 characters with uppercase, lowercase, number, and special character.'
);

/**
 * CUSTOM ASYNC RULE: usernameAvailable
 * Real-world use case: Check username availability against a database/API
 * Simulates a 1-second API call to check reserved usernames
 */
Ctrovalidate.addAsyncRule(
  'usernameAvailable',
  async (value, params, element, signal) => {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      const timeout = setTimeout(() => {
        const reserved = ['admin', 'root', 'ctrotech', 'system', 'moderator'];
        const username = (value as string).toLowerCase();
        resolve(!reserved.includes(username));
      }, 1000);

      // Handle abort signal (when user types again before validation completes)
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Validation aborted'));
        });
      }
    });
  },
  'This username is already taken. Please choose another.'
);

// =============================================================================
// 2. CUSTOM ERROR MESSAGES
// =============================================================================

/**
 * Override default error messages globally
 * Real-world use case: Customize messages for your brand/audience
 */
Ctrovalidate.setCustomMessages({
  required: 'This field is required. Please provide a value.',
  email: 'Please enter a valid email address (e.g., user@example.com).',
  minLength: 'Please enter at least {0} characters.',
  maxLength: 'Please enter no more than {0} characters.',
});

// =============================================================================
// 3. INITIALIZE VALIDATOR WITH CONFIGURATION
// =============================================================================

const form = document.querySelector<HTMLFormElement>('#showcase-form');
if (!form) {
  throw new Error('Form not found!');
}

/**
 * Initialize Ctrovalidate with all configuration options
 * Real-world use case: Customize behavior and styling for your app
 */
const validator = new Ctrovalidate(form, {
  // Log all validation activity to console (useful for debugging)
  logLevel: LogLevel.DEBUG,

  // Enable real-time validation (validate on blur and input events)
  realTime: true,

  // Custom CSS classes for styling
  errorClass: 'is-invalid',           // Applied to invalid fields
  errorMessageClass: 'error-message', // Container for error messages
  pendingClass: 'is-validating',      // Applied during async validation
});

// =============================================================================
// 4. STATE INSPECTOR (isDirty, getError)
// =============================================================================

/**
 * Real-world use case: Show user which fields they've interacted with
 * and display current validation errors in a summary panel
 */
const stateOutput = document.getElementById('state-output');

function updateStateInspector() {
  if (!stateOutput) return;

  const fields = [
    'fullname', 'email', 'username', 'password', 'password_confirm',
    'mobile', 'age', 'contact_method'
  ];

  let html = '<table class="state-table"><thead><tr><th>Field</th><th>Dirty?</th><th>Error</th></tr></thead><tbody>';

  fields.forEach(fieldName => {
    const isDirty = validator.isDirty(fieldName);
    const error = validator.getError(fieldName);

    html += `
      <tr>
        <td><code>${fieldName}</code></td>
        <td>${isDirty ? '✓ Yes' : '✗ No'}</td>
        <td>${error ? `<span class="error-text">${error}</span>` : '-'}</td>
      </tr>
    `;
  });

  html += '</tbody></table>';
  stateOutput.innerHTML = html;
}

// Update state inspector on every input/blur event
form.addEventListener('blur', updateStateInspector, true);
form.addEventListener('input', updateStateInspector, true);

// =============================================================================
// 5. API METHOD DEMONSTRATIONS
// =============================================================================

/**
 * API METHOD: validate()
 * Real-world use case: Validate entire form before submission
 */
document.getElementById('btn-validate')?.addEventListener('click', async () => {
  console.log('🔍 Validating entire form...');
  const isValid = await validator.validate();

  if (isValid) {
    alert('✅ Form is valid! All fields passed validation.');
  } else {
    alert('❌ Form has errors. Please check the highlighted fields.');
  }

  updateStateInspector();
});

/**
 * API METHOD: reset()
 * Real-world use case: Clear form and reset all validation states
 */
document.getElementById('btn-reset')?.addEventListener('click', () => {
  console.log('↻ Resetting form...');
  validator.reset();
  form.reset();
  updateStateInspector();
  alert('Form has been reset!');
});

/**
 * API METHOD: refresh()
 * Real-world use case: Re-discover fields after DOM manipulation
 */
document.getElementById('btn-refresh')?.addEventListener('click', () => {
  console.log('⟳ Refreshing field discovery...');
  validator.refresh();
  alert('Field discovery refreshed! All fields have been re-scanned.');
});

/**
 * API METHOD: addField() & removeField()
 * Real-world use case: Dynamic forms (e.g., "Add another phone number")
 */
let dynamicFieldCount = 0;

document.getElementById('btn-add-field')?.addEventListener('click', () => {
  dynamicFieldCount++;
  const container = document.getElementById('dynamic-fields-container');
  if (!container) return;

  // Create new field group
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'form-group dynamic-field-group';
  fieldGroup.id = `dynamic-field-${dynamicFieldCount}`;

  fieldGroup.innerHTML = `
    <label for="dynamic_email_${dynamicFieldCount}">
      Additional Email #${dynamicFieldCount}
      <button type="button" class="remove-field-btn" data-field-id="dynamic-field-${dynamicFieldCount}">
        ✕ Remove
      </button>
    </label>
    <input 
      type="email" 
      id="dynamic_email_${dynamicFieldCount}" 
      name="dynamic_email_${dynamicFieldCount}" 
      placeholder="additional@example.com"
      data-ctrovalidate-rules="required|email"
    />
    <small>Dynamically added field with validation</small>
    <div class="error-message"></div>
  `;

  container.appendChild(fieldGroup);

  // Add the new field to validator
  const newInput = fieldGroup.querySelector('input');
  if (newInput) {
    validator.addField(newInput);
    console.log(`➕ Added dynamic field: dynamic_email_${dynamicFieldCount}`);
  }

  // Add remove button handler
  const removeBtn = fieldGroup.querySelector('.remove-field-btn');
  removeBtn?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const fieldId = target.dataset.fieldId;
    const fieldToRemove = document.getElementById(fieldId!);
    const inputToRemove = fieldToRemove?.querySelector('input');

    if (inputToRemove) {
      // Remove field from validator
      validator.removeField(inputToRemove);
      console.log(`➖ Removed dynamic field: ${inputToRemove.name}`);
    }

    // Remove from DOM
    fieldToRemove?.remove();
  });
});

/**
 * API METHOD: destroy()
 * Real-world use case: Clean up when component unmounts (e.g., SPA navigation)
 */
document.getElementById('btn-destroy')?.addEventListener('click', () => {
  if (confirm('⚠️ This will destroy the validator instance. You will need to refresh the page to reinitialize. Continue?')) {
    console.log('✕ Destroying validator...');
    validator.destroy();
    alert('Validator destroyed! Refresh the page to reinitialize.');
  }
});

// =============================================================================
// 6. FORM SUBMISSION HANDLER
// =============================================================================

/**
 * Real-world use case: Validate before submitting to server
 */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('📤 Form submission triggered...');

  // Validate entire form
  const isValid = await validator.validate();

  if (isValid) {
    console.log('✅ VALIDATION SUCCESS');

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('📋 Form Data:', data);
    console.table(data);

    alert('🚀 Registration successful! Check console for submitted data.');

    // In a real app, you would submit to your API here:
    // await fetch('/api/register', { method: 'POST', body: JSON.stringify(data) });
  } else {
    console.warn('❌ VALIDATION FAILURE');
    alert('❌ Please fix the errors in the form before submitting.');
  }

  updateStateInspector();
});

// =============================================================================
// 7. INITIAL STATE
// =============================================================================

console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                   CTROVALIDATE v3.0.0 - FEATURE SHOWCASE                  ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  ✓ 21 Built-in Validation Rules                                           ║
║  ✓ 9 Public API Methods                                                   ║
║  ✓ 5 Configuration Options                                                ║
║  ✓ Async Validation with Abort Controllers                                ║
║  ✓ Field Dependencies (Conditional Validation)                            ║
║  ✓ Custom Rules & Messages                                                ║
║  ✓ State Inspection (isDirty, getError)                                   ║
║  ✓ Dynamic Field Management                                               ║
║  ✓ Real-time Validation                                                   ║
║  ✓ Accessibility (ARIA) Support                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

🎮 Try the API controls above to test all methods!
🔍 Watch the State Inspector to see field states in real-time!
📋 All validation rules are demonstrated in the form below!
`);

// Initialize state inspector
updateStateInspector();
