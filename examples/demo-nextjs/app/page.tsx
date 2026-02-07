'use client';

import React, { useActionState, useEffect } from 'react';
import { useCtrovalidate } from '@ctrovalidate/react';
import { Toaster, toast } from 'sonner';
import { registerUser, checkUsername, ActionState, checkEmail } from './actions';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const initialState: ActionState = {
  success: false,
  message: '',
};

interface FormValues extends Record<string, unknown> {
  username: string;
  email: string;
}


export default function Home() {
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
      username: 'required|username',
      email: 'required|email|emailAvailable'
    },
    initialValues: {
      username: '',
      email: ''
    },
    customRules: {
      usernameAvailable: async (value: unknown) => {
        const username = String(value);
        if (username.length < 3) return true;
        try {
          return await checkUsername(username);
        } catch (e) {
          return false;
        }
      },
      emailAvailable: async (value: unknown) => {
        const email = String(value);
        if (email.length < 3) return true;
        try {
          return await checkEmail(email);
        } catch (e) {
          return false;
        }
      }
    },
    messages: {
      usernameAvailable: 'ID is already registered in the node network.',
      emailAvailable: 'Email is already registered in the node network.'
    }
  });

  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success('ACCESS GRANTED', { description: state.message });
        reset();
      } else {
        toast.error('ACCESS DENIED', { description: state.message });
      }
    }
  }, [state, reset]);

  const handleSubmit = async (payload: FormData) => {
    // Client-side pre-flight check
    const isValid = await validateForm();
    if (!isValid) {
      toast.warning('VALIDATION FAILED', { description: 'Correct errors before submitting payload to server.' });
      return;
    }

    // Determine validity, then submit
    React.startTransition(() => {
      formAction(payload);
    });
  };

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 font-mono text-neutral-900">
      <Toaster position="top-right" theme="light" />

      <div className="w-full max-w-lg bg-white border border-neutral-900 shadow-[8px_8px_0px_0px_rgba(23,23,23,1)]">
        <header className="border-b border-neutral-900 p-6 bg-neutral-50 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tighter">Node Registration</h1>
            <p className="text-xs text-neutral-500 uppercase mt-1">Secure Uplink v4.0 (Hook Refactor)</p>
          </div>
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" title="System Online" />
        </header>

        <form
          action={handleSubmit}
          noValidate
          className="p-8 space-y-6"
        >
          {/* Username Field */}
          <div className="space-y-2 group">
            <label htmlFor="username" className="text-xs font-bold uppercase tracking-wide text-neutral-500 group-focus-within:text-neutral-900 transition-colors">
              Node ID (Username)
            </label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                value={values.username}
                onChange={(e) => handleChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                placeholder="e.g. unit-734"
                className={cn(
                  "w-full bg-neutral-50 border-b-2 border-neutral-200 p-3 outline-none transition-all",
                  "focus:border-neutral-900 focus:bg-white placeholder:text-neutral-300",
                  errors.username && "border-red-500 bg-red-50",
                  isValidating.username && "animate-pulse bg-neutral-100"
                )}
              />
              {errors.username && (
                <div className="text-[10px] uppercase font-bold tracking-wider text-red-600 mt-1">
                  {errors.username}
                </div>
              )}
            </div>
            <p className="text-[10px] text-neutral-400">
              {isValidating.username ? '* Checking availability...' : '* Real-time validation enabled'}
            </p>
          </div>

          {/* Email Field */}
          <div className="space-y-2 group">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-neutral-500 group-focus-within:text-neutral-900 transition-colors">
              Contact Relay (Email)
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="operator@industrial.net"
                className={cn(
                  "w-full bg-neutral-50 border-b-2 border-neutral-200 p-3 outline-none transition-all",
                  "focus:border-neutral-900 focus:bg-white placeholder:text-neutral-300",
                  errors.email && "border-red-500 bg-red-50"
                )}
              />
              {errors.email && (
                <div className="text-[10px] uppercase font-bold tracking-wider text-red-600 mt-1">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending || Object.values(isValidating).some(Boolean)}
            className={cn(
              "w-full flex items-center justify-center gap-2 bg-neutral-900 text-white p-4 font-bold uppercase tracking-widest text-sm transition-all",
              "hover:bg-neutral-800 active:translate-y-px",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing Uplink...
              </>
            ) : (
              'Initialize Sequence'
            )}
          </button>

          <div className="text-center">
            <p className="text-[10px] text-neutral-400 uppercase">
              By initializing, you agree to the <span className="underline cursor-pointer hover:text-neutral-900">Protocol Terms</span>.
            </p>
          </div>
        </form>
      </div>

      {/* Debugger (Optional) */}
      <div className="hidden lg:block fixed bottom-4 right-4 bg-white border border-neutral-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xs text-[10px] overflow-auto max-h-[400px]">
        <h4 className="font-bold border-b border-neutral-200 mb-2 pb-1">UPLINK STATE</h4>
        <pre>{JSON.stringify({ values, errors, isDirty, isValidating }, null, 2)}</pre>
      </div>
    </main>
  );
}
