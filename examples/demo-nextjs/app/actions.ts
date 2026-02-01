'use server';

// Simulate a database
const DB = {
    users: ['admin', 'root', 'support', 'ctrotech']
};

export async function checkUsername(username: string): Promise<boolean> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const taken = DB.users.some(u => u.toLowerCase() === username.toLowerCase());
    return !taken;
}

export type ActionState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function registerUser(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;

    if (!username || !email) {
        return {
            success: false,
            message: 'Validation failed on server.',
        };
    }

    // Double-check username unique rule on server
    const isUnique = await checkUsername(username);
    if (!isUnique) {
        return {
            success: false,
            message: 'Username was claimed during submission.',
        };
    }

    return {
        success: true,
        message: `Welcome to the Industrial Network, ${username}. Payload authorized.`,
    };
}
