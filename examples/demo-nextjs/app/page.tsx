"use client";

import { useEffect, useRef, useState } from "react";
import { Ctrovalidate } from "ctrovalidate";

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [contactMethod, setContactMethod] = useState("email");

  useEffect(() => {
    if (formRef.current) {
      // Initialize Custom Rules
      Ctrovalidate.addRule(
        "strongPassword",
        (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value as string),
        "Use at least 8 characters with upper, lower, and numeric values."
      );

      Ctrovalidate.addAsyncRule(
        "usernameAvailable",
        async (value) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const reserved = ["admin", "root", "ctrotech"];
              resolve(!reserved.includes((value as string).toLowerCase()));
            }, 1000);
          });
        },
        "This username is already reserved by the system."
      );

      // Initialize Validator
      const validator = new Ctrovalidate(formRef.current, {
        logLevel: Ctrovalidate.LogLevel.DEBUG,
        realTime: true,
        pendingClass: "is-validating",
      });

      const handleSubmission = async (e: Event) => {
        e.preventDefault();
        console.log("--- NEXT.JS SUBMISSION INITIATED ---");

        const isValid = await validator.validate();

        if (isValid) {
          console.log("✅ VALIDATION SUCCESS");
          alert("🚀 Registration successful! (Next.js Demo)");
          if (formRef.current) {
            const data = Object.fromEntries(new FormData(formRef.current).entries());
            console.table(data);
          }
        } else {
          console.warn("❌ VALIDATION FAILURE");
        }
      };

      formRef.current.addEventListener("submit", handleSubmission);

      return () => {
        formRef.current?.removeEventListener("submit", handleSubmission);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="showcase-container">
        <header>
          <div className="logo-text">Ctrovalidate</div>
          <p>Next.js • Tailwind • Monochrome</p>
        </header>

        <form ref={formRef} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="e.g. John Doe"
              data-ctrovalidate-rules="required|minLength:3|alpha"
            />
            <div className="spinner"></div>
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
            <div className="spinner"></div>
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
            <div className="spinner"></div>
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
            <div className="spinner"></div>
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
            <div className="spinner"></div>
            <div className="error-message"></div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="terms" name="terms" data-ctrovalidate-rules="required" />
            <label htmlFor="terms">I agree to the industrial standards of testing</label>
          </div>
          <div className="error-message" style={{ marginTop: "-0.5rem" }}></div>

          <button type="submit" className="submit-btn text-white">
            Register Integration
          </button>
        </form>

        <div className="footer-note">
          Powered by Ctrovalidate Core v2.1.1
        </div>
      </div>
    </div>
  );
}
