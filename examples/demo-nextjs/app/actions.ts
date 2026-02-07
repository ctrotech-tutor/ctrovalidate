import { validateAction, ValidationSchema } from '@ctrovalidate/next';

// Simulate a database
const DB = {
    users: ['admin', 'root', 'support', 'ctrotech'],
    emails: ['admin@ctrotech.com', 'root@ctrotech.com', 'support@ctrotech.com', 'ctrotech@ctrotech.com']
};

export async function checkUsername(username: string): Promise<boolean> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const taken = DB.users.some(u => u.toLowerCase() === username.toLowerCase());
    return !taken;
}

export async function checkEmail(email: string): Promise<boolean> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const taken = DB.emails.some(u => u.toLowerCase() === email.toLowerCase());
    return !taken;
}

export type ActionState = {
    success: boolean;
    message: string;
    errors?: Record<string, string | null>;
};

const registrationSchema: ValidationSchema = {
    username: 'required|username|usernameAvailable',
    email: 'required|email|emailAvailable'
};

export async function registerUser(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 1. Validate with Ctrovalidate/Next
    const { isValid, errors, values } = validateAction(formData, registrationSchema);

    if (!isValid) {
        return {
            success: false,
            message: 'Access denied: Security protocols not met.',
            errors
        };
    }

    // 2. Business logic (Double-check username unique rule on server)
    const isUnique = await checkUsername(values.username as string);
    if (!isUnique) {
        return {
            success: false,
            message: 'Username was claimed during submission.',
            errors: { username: 'ID is already registered in the node network.' }
        };
    }

    return {
        success: true,
        message: `Welcome to the Industrial Network, ${values.username as string}. Payload authorized.`,
    };
}
