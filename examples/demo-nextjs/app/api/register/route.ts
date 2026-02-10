// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateAction } from '@ctrovalidate/next'; // your async validator wrapper
import type { ValidationSchema } from '@ctrovalidate/core';

type Payload = {
    username?: string;
    email?: string;
};

const registrationSchema: ValidationSchema = {
    username: 'required|username|usernameAvailable',
    email: 'required|email|emailAvailable',
};

export async function POST(req: NextRequest) {
    console.log('API /api/register hit!');
    try {
        const formData = await req.formData(); // built-in FormData from Next request
        // Pass options if you need locale/messages
        const { isValid, errors, values } = await validateAction<Payload>(
            formData,
            registrationSchema,
            {
                locale: 'en',
                customRules: {
                    usernameAvailable: async (value: unknown) => {
                        // Simulate DB check (same as check-username route)
                        await new Promise((r) => setTimeout(r, 350));
                        const users = ['admin', 'root', 'support', 'ctrotech'];
                        return !users.some(u => u.toLowerCase() === String(value).toLowerCase());
                    },
                    emailAvailable: async (value: unknown) => {
                        // Simulate DB check
                        await new Promise((r) => setTimeout(r, 350));
                        const emails = ['admin@ctrotech.com', 'root@ctrotech.com'];
                        return !emails.some(e => e.toLowerCase() === String(value).toLowerCase());
                    }
                }
            }
        );

        if (!isValid) {
            return NextResponse.json({ success: false, message: 'Validation failed', errors }, { status: 422 });
        }

        // Business logic (DB writes, additional server checks)
        // Example: double-check username availability server-side (defensive)
        const username = String(values.username || '');
        // simulate DB check
        await new Promise((r) => setTimeout(r, 400));
        const taken = false; // replace with real DB lookup
        if (taken) {
            return NextResponse.json({
                success: false,
                message: 'Username is already taken',
                errors: { username: 'This username is taken' }
            }, { status: 409 });
        }

        // Create user etc...
        return NextResponse.json({ success: true, message: `Welcome ${username}` });
    } catch (err) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
