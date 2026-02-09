---
title: Testing | Ensuring Logic Reliability
description: Learn the best practices for testing Ctrovalidate forms, from unit testing isomorphic schemas with Vitest to E2E testing with Playwright.
breadcrumb:
  - name: Ctrovalidate
    url: https://ctrovalidate.vercel.app/
  - name: Advanced
    url: https://ctrovalidate.vercel.app/v4/advanced/testing
  - name: Testing
    url: https://ctrovalidate.vercel.app/v4/advanced/testing
---

# Testing

Ctrovalidate is designed with high logic coverage, but your application-specific schemas and custom rules should also be verified. This guide covers testing strategies for every layer of the monorepo.

---

## 🏗️ Unit Testing (Isomorphic)

Since `@ctrovalidate/core` is pure JavaScript, you can unit test your schemas in any environment (Vitest, Jest, Node). This is the fastest way to verify complex business logic.

```javascript
import { validateValue } from '@ctrovalidate/core';
import { SignupSchema } from './schemas';

describe('Signup Schema', () => {
  it('should fail on weak passwords', () => {
    const result = validateValue('123', SignupSchema.password);
    expect(result.isValid).toBe(false);
    expect(result.rule).toBe('strongPassword');
  });

  it('should pass on valid email', () => {
    const result = validateValue('test@test.com', SignupSchema.email);
    expect(result.isValid).toBe(true);
  });
});
```

---

## ⚡ Component Testing (React/Vue/Svelte)

When testing framework adapters, use **React Testing Library** or **Vue Test Utils**. Focus on user interactions (`fireEvent`, `@testing-library/user-event`).

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyForm from './MyForm';

test('shows error message on invalid email', async () => {
  render(<MyForm />);
  
  const input = screen.getByLabelText(/email/i);
  fireEvent.change(input, { target: { value: 'invalid-email' } });
  fireEvent.blur(input);

  expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
});
```

---

## 🛡️ E2E Testing (Browser)

For high-standard verification of the `@ctrovalidate/browser` controller, use **Playwright** or **Cypress**. This ensures that event listeners, DOM discovery, and ARIA attributes are working correctly in real browsers.

```javascript
// Playwright example
test('form should not submit if invalid', async ({ page }) => {
  await page.goto('/signup');
  
  await page.click('button[type="submit"]');

  // Verify ARIA state
  const emailInput = page.locator('input[name="email"]');
  await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
  
  // Verify error message presence
  await expect(page.locator('.error-message')).toBeVisible();
});
```

---

## ✅ Best Practices

- **Test the Schema, Not the Library**: Trust that Ctrovalidate's rules work. Focus your tests on verifying that *your* schema correctly combines those rules for your specific data.
- **Mocking Async Rules**: Use Vitest/Jest mocks or MSW (Mock Service Worker) to simulate API responses for your async validation rules.
- **Accessibility Checks**: Use `axe-core` in your E2E tests to verify that the `aria-describedby` links correctly and that error containers have the proper roles.



