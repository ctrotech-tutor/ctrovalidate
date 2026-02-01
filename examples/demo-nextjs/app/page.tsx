'use client';

import React, { useEffect, useRef, useActionState } from 'react';
import { Ctrovalidate } from 'ctrovalidate';
import { Toaster, toast } from 'sonner';
import { registerUser, checkUsername, ActionState } from './actions';
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

export default function Home() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);

  useEffect(() => {
    if (formRef.current && !validatorRef.current) {
      // 1. Register Async Rule
      Ctrovalidate.addAsyncRule(
        'usernameAvailable',
        async (originalValue, _params, _el, signal) => {
          const value = String(originalValue);
          if (value.length < 3) return true; // Let minLength handle it

          try {
            return await checkUsername(value);
          } catch (e: any) {
            if (e.name === 'AbortError') return true;
            return false;
          }
        },
        'ID is already registered in the node network.'
      );

      // 2. Initialize
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true,
        logLevel: Ctrovalidate.LogLevel.INFO,
        errorClass: 'border-red-500 bg-red-50 text-red-900',
        pendingClass: 'animate-pulse bg-gray-100',
        errorMessageClass: 'text-[10px] uppercase font-bold tracking-wider text-red-600 mt-1'
      });
    }

    return () => {
      validatorRef.current?.destroy();
      validatorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success('ACCESS GRANTED', { description: state.message });
        formRef.current?.reset();
        validatorRef.current?.reset();
      } else {
        toast.error('ACCESS DENIED', { description: state.message });
      }
    }
  }, [state]);

  const handleSubmit = async (payload: FormData) => {
    // Client-side pre-flight check
    const isValid = await validatorRef.current?.validate();
    if (!isValid) {
      toast.warning('VALIDATION FAILED', { description: 'Correct errors before submitting payload to server.' });
      return;
    }

    // Determine validity, then submit
    formAction(payload);
  };

  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 font-mono text-neutral-900">
      <Toaster position="top-right" theme="light" />

      <div className="w-full max-w-lg bg-white border border-neutral-900 shadow-[8px_8px_0px_0px_rgba(23,23,23,1)]">
        <header className="border-b border-neutral-900 p-6 bg-neutral-50 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-tighter">Node Registration</h1>
            <p className="text-xs text-neutral-500 uppercase mt-1">Secure Uplink v4.0</p>
          </div>
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" title="System Online" />
        </header>

        <form
          ref={formRef}
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
                data-ctrovalidate-rules="required|minLength:4|usernameAvailable"
                placeholder="e.g. unit-734"
                className={cn(
                  "w-full bg-neutral-50 border-b-2 border-neutral-200 p-3 outline-none transition-all",
                  "focus:border-neutral-900 focus:bg-white placeholder:text-neutral-300"
                )}
              />
              <div className="error-message"></div>
            </div>
            <p className="text-[10px] text-neutral-400">
              * Checking availability against central database...
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
                data-ctrovalidate-rules="required|email"
                placeholder="operator@industrial.net"
                className={cn(
                  "w-full bg-neutral-50 border-b-2 border-neutral-200 p-3 outline-none transition-all",
                  "focus:border-neutral-900 focus:bg-white placeholder:text-neutral-300"
                )}
              />
              <div className="error-message"></div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
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
    </main>
  );
}
