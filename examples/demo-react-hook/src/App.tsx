import { useCtrovalidate } from '@ctrovalidate/react';
import { translator } from '@ctrovalidate/core';
import { useState } from 'react';

// 1. Register a dictionary for Spanish
translator.addMessages('es', {
    required: '¡Este campo es obligatorio!',
    minLength: 'Debe tener al menos {0} caracteres.',
    email: 'Por favor, introduce un correo electrónico válido.'
});

// Set global locale to Spanish
translator.setLocale('es');

interface FormValues {
    username: string;
    email: string;
}

function App() {
    const [currentLocale, setCurrentLocale] = useState('es');

    // Form 1: Uses GLOBAL locale (Spanish)
    const form1 = useCtrovalidate<FormValues>({
        schema: {
            username: 'required|minLength:4',
            email: 'required|email'
        },
        initialValues: {
            username: '',
            email: ''
        },
        // No locale option - uses global translator
    });

    // Form 2: Uses HOOK-LEVEL locale override (English)
    const form2 = useCtrovalidate<FormValues>({
        schema: {
            username: 'required|minLength:4',
            email: 'required|email'
        },
        initialValues: {
            username: '',
            email: ''
        },
        locale: 'en', // OVERRIDE: Always use English for this form
    });

    // Toggle global locale
    const toggleLocale = async () => {
        const newLocale = currentLocale === 'en' ? 'es' : 'en';
        translator.setLocale(newLocale);
        setCurrentLocale(newLocale);

        // Re-validate Form 1 to update with new global locale
        await form1.validateForm();
        // Form 2 should NOT change because it has hook-level override
    };

    const handleSubmit1 = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await form1.validateForm();
        if (isValid) {
            alert('Form 1 submitted successfully!');
        }
    };

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await form2.validateForm();
        if (isValid) {
            alert('Form 2 submitted successfully!');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Ctrovalidate i18n Demo</h1>
                <button
                    onClick={toggleLocale}
                    style={{
                        padding: '8px 16px',
                        background: currentLocale === 'en' ? '#0070f3' : '#ff4757',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Global: {currentLocale.toUpperCase()} (Toggle)
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Form 1: Uses Global Locale */}
                <div style={{ border: '2px solid #0070f3', borderRadius: '8px', padding: '20px' }}>
                    <h2 style={{ marginTop: 0 }}>Form 1: Global Locale</h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>Uses global translator (currently: {currentLocale})</p>

                    <form onSubmit={handleSubmit1} noValidate>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username1">Username:</label><br />
                            <input
                                id="username1"
                                name="username"
                                value={form1.values.username as string}
                                onChange={(e) => form1.handleChange('username', e.target.value)}
                                onBlur={() => form1.handleBlur('username')}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '5px',
                                    border: form1.errors.username ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            {form1.errors.username && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{form1.errors.username}</div>}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email1">Email:</label><br />
                            <input
                                id="email1"
                                name="email"
                                value={form1.values.email as string}
                                onChange={(e) => form1.handleChange('email', e.target.value)}
                                onBlur={() => form1.handleBlur('email')}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '5px',
                                    border: form1.errors.email ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            {form1.errors.email && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{form1.errors.email}</div>}
                        </div>

                        <button type="submit" style={{ padding: '8px 16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Submit
                        </button>
                    </form>
                </div>

                {/* Form 2: Uses Hook-Level Locale Override */}
                <div style={{ border: '2px solid #10b981', borderRadius: '8px', padding: '20px' }}>
                    <h2 style={{ marginTop: 0 }}>Form 2: Hook-Level Override</h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>Always uses English (locale: 'en')</p>

                    <form onSubmit={handleSubmit2} noValidate>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="username2">Username:</label><br />
                            <input
                                id="username2"
                                name="username"
                                value={form2.values.username as string}
                                onChange={(e) => form2.handleChange('username', e.target.value)}
                                onBlur={() => form2.handleBlur('username')}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '5px',
                                    border: form2.errors.username ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            {form2.errors.username && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{form2.errors.username}</div>}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email2">Email:</label><br />
                            <input
                                id="email2"
                                name="email"
                                value={form2.values.email as string}
                                onChange={(e) => form2.handleChange('email', e.target.value)}
                                onBlur={() => form2.handleBlur('email')}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginTop: '5px',
                                    border: form2.errors.email ? '1px solid red' : '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                            {form2.errors.email && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{form2.errors.email}</div>}
                        </div>

                        <button type="submit" style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h3>Test Instructions</h3>
                <ol style={{ lineHeight: '1.8' }}>
                    <li>Leave both forms empty and click "Submit" on each</li>
                    <li><strong>Form 1</strong> should show Spanish errors (¡Este campo es obligatorio!)</li>
                    <li><strong>Form 2</strong> should show English errors (This field is required.)</li>
                    <li>Click "Toggle" to switch global locale to English</li>
                    <li><strong>Form 1</strong> errors should update to English</li>
                    <li><strong>Form 2</strong> errors should REMAIN in English (hook-level override)</li>
                </ol>
            </div>
        </div>
    );
}

export default App;
