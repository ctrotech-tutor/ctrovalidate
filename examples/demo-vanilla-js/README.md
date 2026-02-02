# Ctrovalidate v3.0.0 - Complete Feature Showcase

**A comprehensive, production-ready demonstration of every Ctrovalidate feature.**

## 🎯 What This Demo Demonstrates

This is not just a basic example—it's a **complete feature showcase** that demonstrates every single capability of the Ctrovalidate library in real-world, production-ready scenarios.

### ✅ All 21 Built-in Validation Rules

**Common Rules (6)**
- `required` - Full Name field
- `email` - Email Address field
- `minLength` - Full Name (min 3 chars)
- `maxLength` - Full Name (max 50 chars)
- `exactLength` - Invite Code (exactly 6 chars)
- `sameAs` - Password Confirmation

**Format Rules (9)**
- `alpha` - Country Code (letters only)
- `alphaNum` - Invite Code (letters & numbers)
- `alphaDash` - Username (letters, numbers, dashes, underscores)
- `phone` - Mobile Number (international & local)
- `url` - Website URL
- `creditCard` - Credit Card Number (Luhn algorithm)
- `strongPassword` - Password (custom rule)
- `json` - Metadata field (valid JSON)
- `ipAddress` - IP Address (IPv4 & IPv6)

**Numeric Rules (6)**
- `numeric` - Employee ID
- `integer` - Years of Experience, Age
- `decimal` - Hourly Rate
- `min` - Years (min 0), Hourly Rate (min $15)
- `max` - Years (max 50), Hourly Rate (max $200)
- `between` - Age (18-100)

### 🎮 All 9 Public API Methods

1. **`validate()`** - "Validate Form" button - Validates entire form programmatically
2. **`reset()`** - "Reset Form" button - Clears all validation states
3. **`refresh()`** - "Refresh Fields" button - Re-discovers fields after DOM changes
4. **`addField()`** - "Add Dynamic Field" button - Adds fields programmatically
5. **`removeField()`** - Remove button on dynamic fields - Removes fields programmatically
6. **`isDirty()`** - State Inspector panel - Shows which fields have been touched
7. **`getError()`** - State Inspector panel - Shows current validation errors
8. **`destroy()`** - "Destroy Validator" button - Cleans up validator instance
9. **Static Methods** - `addRule()`, `addAsyncRule()`, `setCustomMessages()` - Demonstrated in code

### ⚙️ All 5 Configuration Options

```typescript
new Ctrovalidate(form, {
  logLevel: Ctrovalidate.LogLevel.DEBUG,  // Console logging
  realTime: true,                         // Real-time validation
  errorClass: 'is-invalid',               // Custom CSS class
  errorMessageClass: 'error-message',     // Custom CSS class
  pendingClass: 'is-validating',          // Async validation class
});
```

### 🔧 Advanced Features

- **Async Validation** - Username availability check (simulates API call)
- **Field Dependencies** - Conditional validation based on other fields
  - Email/Phone fields validate only when contact method is selected
  - Referral code validates only when checkbox is checked
- **Custom Rules** - `strongPassword` and `usernameAvailable`
- **Custom Messages** - Global message overrides
- **State Inspection** - Live panel showing `isDirty()` and `getError()` for all fields
- **Dynamic Forms** - Add/remove email fields programmatically
- **Real-time Validation** - Validates on blur and input events
- **Accessibility** - Automatic ARIA management

## 🚀 Running the Demo

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open your browser to the URL shown (typically `http://localhost:5173`).

## 📋 How to Use

1. **Fill out the form** - Try different validation rules
2. **Use API Controls** - Test all 9 API methods with the buttons at the top
3. **Watch State Inspector** - See field states update in real-time
4. **Add Dynamic Fields** - Click "Add Dynamic Field" to test `addField()` and `removeField()`
5. **Test Dependencies** - Change "Preferred Contact Method" to see conditional validation
6. **Check Console** - All validation activity is logged with `DEBUG` level

## 💡 Real-World Applications

Every feature in this demo is designed for real-world use:

- **User Registration Forms** - Password validation, email confirmation
- **Profile Management** - Dynamic fields, conditional validation
- **Payment Forms** - Credit card validation, numeric ranges
- **Admin Panels** - JSON metadata, IP address validation
- **Multi-step Forms** - State inspection, programmatic validation
- **SPA Integration** - `destroy()` for component cleanup

## 📖 Code Structure

- **`index.html`** - Complete form with all 21 validation rules organized by category
- **`src/main.ts`** - Comprehensive implementation with:
  - Custom rule registration
  - Custom message overrides
  - All 9 API method demonstrations
  - State inspector logic
  - Detailed comments explaining each feature
- **`src/style.css`** - Professional monochrome styling with:
  - API control panel
  - State inspector panel
  - Dynamic field styling
  - Responsive design

## 🎓 Learning Resources

Each section of the code includes detailed comments explaining:
- **What** the feature does
- **Why** you would use it
- **How** to apply it in real-world scenarios

Check the console output for a complete feature checklist!

---

**Built with Ctrovalidate v3.0.0** • [Documentation](https://ctrotech-tutor.github.io/ctrovalidate/) • [GitHub](https://github.com/ctrotech-tutor/ctrovalidate)
