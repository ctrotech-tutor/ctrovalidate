# Integration: React

Integrating Ctrovalidate into a [React](https://react.dev/) application requires careful handling of DOM elements and component lifecycle, as React controls the DOM. The recommended approach uses React's built-in hooks to ensure that Ctrovalidate initializes correctly and has a stable reference to the form.

This guide assumes you have a standard React project, likely set up with a tool like [Vite](https://vitejs.dev/) or Create React App.

## The Core Pattern

The key to a successful integration in React is to use the `useRef` and `useEffect` hooks.

1.  **`useRef` for DOM Elements:** Use the `useRef` hook to create a persistent reference to your `<form>` DOM element. This is React's standard and safest way to access a DOM node directly.
2.  **`useRef` for the Instance:** It's also a good practice to store the Ctrovalidate instance itself in a ref (`validatorRef.current`). This prevents the instance from being recreated on every component re-render.
3.  **`useEffect` for Initialization:** Initialize Ctrovalidate inside a `useEffect` hook with an empty dependency array (`[]`). This is critical because it guarantees the code runs exactly once, right after the component's DOM has been mounted for the first time.

This pattern ensures that you are not fighting against React's lifecycle and that your validator is a stable, persistent object.

## Example: A Standard React Component

Let's create a `RegistrationForm` component in a typical React project.

### 1. The Component JSX

In your component's return statement, define your form. Use the `ref` attribute to attach the ref you created and `onSubmit` to hook into the form's submission event.

```jsx
import React from 'react';

function RegistrationForm() {
  // ... hooks and handlers will go here ...

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          data-ctrovalidate-rules="required|minLength:3|alphaDash"
        />
        <div className="error-message"></div>
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          data-ctrovalidate-rules="required|email"
        />
        <div className="error-message"></div>
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
}
```

### 2. The Component Logic (Hooks)

Inside your component function, use the hooks to manage the integration.

```jsx
import React, { useRef, useEffect } from 'react';
import { Ctrovalidate } from 'ctrovalidate';

function RegistrationForm() {
  // 1. Create a ref to hold the form's DOM element.
  const formRef = useRef(null);
  
  // 2. Create a ref to hold the validator instance.
  const validatorRef = useRef(null);

  // 3. Use the useEffect hook for initialization.
  useEffect(() => {
    // The 'formRef.current' will be the actual <form> DOM node.
    if (formRef.current) {
      console.log('React component mounted. Initializing Ctrovalidate.');
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true
      });
    }
  }, []); // The empty array ensures this effect runs only once.

  // 4. Define the submit handler function.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validatorRef.current) return;
    
    const isFormValid = await validatorRef.current.validate();
    
    if (isFormValid) {
      alert('React form is valid! Submitting...');
      // Logic to submit form data
    } else {
      console.log('React form has errors.');
    }
  };

  return (
    // ... JSX from above ...
  );
}
```

### Notes for TypeScript Users

When using TypeScript with React, you can strongly type your refs for excellent type safety and autocompletion.

```typescript
import React, { useRef, useEffect } from 'react';
import { Ctrovalidate, CtrovalidateInstance } from 'ctrovalidate';

function RegistrationForm() {
  // Type the ref for the form element
  const formRef = useRef<HTMLFormElement>(null);
  
  // Type the ref for the validator instance
  const validatorRef = useRef<CtrovalidateInstance | null>(null);

  useEffect(() => {
    // Note: formRef.current can be null, so we check it.
    if (formRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, { /* ... */ });
    }
  }, []);

  // ...
}
```

### Dynamic Fields in React

When rendering a dynamic list of fields, you will need to manage calling `addField()` and `removeField()`. The `useEffect` hook is again your best tool. You can create an effect that runs whenever your list of fields changes, and inside it, carefully add or remove fields from the validator instance to keep it in sync with React's state.

[**View a simplified CDN example on GitHub**](https://github.com/ctrotech-tutor/ctrovalidate/blob/main/examples/with-react/index.html)

*** End Patch