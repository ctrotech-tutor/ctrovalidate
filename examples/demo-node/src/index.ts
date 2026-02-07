import express from 'express';
import { validate, ValidationSchema } from '@ctrovalidate/core';

const app = express();
const port = 3005;

app.use(express.json());

const registrationSchema: ValidationSchema = {
    username: 'required|minLength:4|alphaDash',
    email: 'required|email',
    password: 'required|strongPassword',
    confirmPassword: 'required|sameAs:password'
};

app.post('/register', (req, res) => {
    const data = req.body;
    console.log('[Server] Received registration request for:', data.username);

    const results = validate(data, registrationSchema);

    const errors: Record<string, string | null> = {};
    let isValid = true;

    for (const key in results) {
        if (!results[key].isValid) {
            errors[key] = results[key].error;
            isValid = false;
        }
    }

    if (!isValid) {
        console.log('[Server] Validation failed:', errors);
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    console.log('[Server] Validation succeeded!');
    res.json({
        success: true,
        message: 'User registered successfully (Server validated)!'
    });
});

app.listen(port, () => {
    console.log(`[Ctrovalidate] Node.js demo running at http://localhost:${port}`);
    console.log('Try POSTing to /register with JSON data.');
});
