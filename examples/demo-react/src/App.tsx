import { useEffect, useRef, useState } from 'react';
import { Ctrovalidate } from 'ctrovalidate';
import './App.css';

/**
 * CTROVALIDATE REACT DEMO 🚀
 * 
 * This example demonstrates how to integrate Ctrovalidate with a modern 
 * React component using the 'useRef' pattern for direct DOM access,
 * ensuring high performance and zero-dependency overhead.
 */
function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [contactMethod, setContactMethod] = useState('email');

  useEffect(() => {
    if (formRef.current) {
      // 1. Initialize Custom Rules
      // You can define rules once and use them across all fields.
      Ctrovalidate.addRule(
        'strongPassword',
        (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value as string),
        'Use at least 8 characters with upper, lower, and numeric values.'
      );

      // 2. Initialize Async Rules
      // Perfect for server-side checks like username or email availability.
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

      // 3. Create Validator Instance
      const validator = new Ctrovalidate(formRef.current, {
        logLevel: Ctrovalidate.LogLevel.DEBUG,
        realTime: true, // Validate as the user types
        pendingClass: 'is-validating',
      });

      // 4. Handle Submission
      const handleSubmission = async (e: Event) => {
        e.preventDefault();
        console.log('--- REACT SUBMISSION INITIATED ---');

        const isValid = await validator.validate();

        if (isValid) {
          console.log('✅ VALIDATION SUCCESS');
          alert('🚀 Registration successful! (React Demo)');
          if (formRef.current) {
            const data = Object.fromEntries(new FormData(formRef.current).entries());
            console.table(data);
          }
        } else {
          console.warn('❌ VALIDATION FAILURE');
        }
      };

      formRef.current.addEventListener('submit', handleSubmission);

      // 5. Lifecycle Cleanup
      return () => {
        formRef.current?.removeEventListener('submit', handleSubmission);
      };
    }
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Ctrovalidate <span className="badge">v2.1.1</span></h1>
        <p>Industrial React Integration • Monochrome Minimalist</p>
      </header>

      <form ref={formRef} noValidate className="validation-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="e.g. John Doe"
            data-ctrovalidate-rules="required|minLength:3|alpha"
          />
          <div className="error-message"></div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Check availability..."
            data-ctrovalidate-rules="required|minLength:3|alphaDash|usernameAvailable"
          />
          <div className="error-message"></div>
        </div>

        <div className="form-group">
          <label htmlFor="contact_method">Preferred Contact Method</label>
          <select
            name="contact_method"
            id="contact_method"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            name="mobile"
            id="mobile"
            type="text"
            placeholder="+1 234 567 890"
            data-ctrovalidate-rules="required|phone"
            data-ctrovalidate-if="contact_method:value=phone"
          />
          <div className="error-message"></div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            data-ctrovalidate-rules="required|email"
            data-ctrovalidate-if="contact_method:value=email"
          />
          <div className="error-message"></div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Security Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            data-ctrovalidate-rules="required|strongPassword"
          />
          <div className="error-message"></div>
        </div>

        <div className="form-group row">
          <input type="checkbox" name="terms" id="terms" data-ctrovalidate-rules="required" />
          <label htmlFor="terms">I agree to the industrial standards of testing</label>
        </div>
        <div className="error-message" style={{ marginBottom: '1rem' }}></div>

        <button type="submit" className="submit-btn">Verify Integration</button>
      </form>

      <footer>
        <p>Powered by Ctrovalidate • Built for real-world performance</p>
      </footer>
    </div>
  );
}

export default App;
