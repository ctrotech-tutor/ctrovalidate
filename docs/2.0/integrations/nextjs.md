# Integration: Next.js

Yes, Ctrovalidate works perfectly with [Next.js](https://nextjs.org/), the React framework for production. However, because Next.js utilizes Server-Side Rendering (SSR) and, more recently, React Server Components (RSC), you must be careful to ensure that Ctrovalidate—a client-side library—only runs in the browser.

The key to using any browser-dependent library in Next.js is the `"use client"` directive.

## The Core Pattern in the App Router

This guide focuses on the modern Next.js App Router. The pattern is nearly identical to the standard React pattern, with the addition of `"use client"`.

1.  **`"use client"` Directive:** Any component that uses React hooks like `useState`, `useEffect`, or `useRef`, or interacts with browser APIs, must be a Client Component. You declare this by placing `"use client";` at the very top of your component file.
2.  **`useRef` for DOM Elements:** Use the `useRef` hook to get a stable reference to your `<form>` DOM element.
3.  **`useEffect` for Initialization:** Initialize Ctrovalidate inside a `useEffect` hook with an empty dependency array (`[]`). This is the standard and correct way to run side effects (like initializing a library) after a component mounts on the client.

## Example: A Next.js Client Component

Let's create a `RegistrationForm` component within a Next.js project.

### 1. Create the Client Component

Create a new file, for example, `components/RegistrationForm.tsx`. The `"use client"` directive at the top is essential.

```tsx
// components/RegistrationForm.tsx

"use client"; // This is the most important line!

import React, { useRef, useEffect } from 'react';
import { Ctrovalidate, type CtrovalidateInstance } from 'ctrovalidate';

export function RegistrationForm() {
	// Create refs to hold the form element and validator instance
	const formRef = useRef<HTMLFormElement>(null);
	const validatorRef = useRef<CtrovalidateInstance | null>(null);

	// Initialize Ctrovalidate once the component mounts on the client
	useEffect(() => {
		if (formRef.current) {
			console.log('Component mounted on client. Initializing Ctrovalidate.');
			validatorRef.current = new Ctrovalidate(formRef.current, {
				realTime: true
			});
		}
	}, []); // Empty array ensures this runs only once

	// Define the submit handler
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!validatorRef.current) return;
    
		const isFormValid = await validatorRef.current.validate();
    
		if (isFormValid) {
			alert('Next.js form is valid! Submitting...');
			// Logic to submit form data via an API route or server action
		} else {
			console.log('Next.js form has errors.');
		}
	};

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

### 2. Use the Component in a Page

Now, you can import and use this `RegistrationForm` component in any of your pages (e.g., `app/register/page.tsx`).

```tsx
// app/register/page.tsx

import { RegistrationForm } from '@/components/RegistrationForm';

export default function RegisterPage() {
	return (
		<main>
			<h1>Create Your Account</h1>
			<RegistrationForm />
		</main>
	);
}
```

### Why This Works

- By marking the component with `"use client"`, you tell Next.js to ship the component's JavaScript to the browser and render it there.
- During the server-side rendering pass, the component might be pre-rendered as static HTML, but the `useEffect` hook will not run.
- Once the page loads in the browser and React "hydrates" the HTML, the `useEffect` hook will fire, and Ctrovalidate will be safely initialized in the browser environment where it can find the form element and attach its event listeners.

This pattern allows you to benefit from Next.js's performance features while still using powerful client-side libraries like Ctrovalidate for rich interactivity.

