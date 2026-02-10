'use client';

import React, { useState } from 'react';
import { useCtrovalidate } from '@ctrovalidate/react';
import { toast } from 'sonner';

type FormValues = {
  username: string;
  email: string;
};

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);

  const {
    values,
    errors,
    isDirty,
    isValidating,
    handleChange,
    handleBlur,
    validateForm,
    reset
  } = useCtrovalidate<FormValues>({
    schema: {
      username: 'required|minLength:3|alphaDash|usernameAvailable',
      email: 'required|email|emailAvailable'
    },
    initialValues: { username: '', email: '' },
    customRules: {
      usernameAvailable: async (value: unknown) => {
        const username = String(value ?? '');
        if (username.length < 3) return true;
        try {
          const res = await fetch('/api/check-username', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
          });
          const j = await res.json();
          return j.ok ? !!j.available : false;
        } catch {
          return false;
        }
      },
      emailAvailable: async (value: unknown) => {
        const email = String(value ?? '');
        if (email.length < 3) return true;
        try {
          const res = await fetch('/api/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          const j = await res.json();
          return j.ok ? !!j.available : false;
        } catch {
          return false;
        }
      }
    },
    messages: {
      usernameAvailable: 'This username is already taken.',
      emailAvailable: 'This email is already registered.'
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture reference before async

    console.log('Submitting form...');
    const ok = await validateForm();
    console.log('Validation result:', ok, errors);
    if (!ok) {
      toast.warning('Fix validation errors before submitting.');
      return;
    }

    try {
      console.log('Starting submission...');
      setSubmitting(true);
      const fd = new FormData(form);
      console.log('FormData created, sending fetch to /api/register...');

      const res = await fetch('/api/register', { method: 'POST', body: fd });
      console.log('Fetch response status:', res.status);

      const json = await res.json();
      console.log('Fetch response body:', json);

      if (!res.ok) {
        console.error('Server error:', json);
        toast.error(json.message || 'Registration failed');
        return;
      }

      toast.success(json.message || 'Registered successfully');
      reset();
    } catch (err) {
      console.error('Submission caught error:', err);
      toast.error('Network or server error');
    } finally {
      setSubmitting(false);
    }
  };

  const isBusy = submitting || Object.values(isValidating).some(Boolean);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-800 p-6 shadow-lg space-y-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create an account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Check availability in real time
          </p>
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            name="username"
            value={values.username}
            onChange={(e) => handleChange('username', e.target.value)}
            onBlur={() => handleBlur('username')}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
              ${errors.username
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }
              dark:border-zinc-600 dark:bg-zinc-900 dark:text-white`}
          />

          {isValidating.username && (
            <p className="text-xs text-gray-500">Checking availability…</p>
          )}

          {errors.username && (
            <p className="text-xs text-red-600">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
              ${errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }
              dark:border-zinc-600 dark:bg-zinc-900 dark:text-white`}
          />

          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isBusy}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white
            hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {submitting ? 'Submitting…' : 'Register'}
        </button>
      </form>
    </div>
  );
}
