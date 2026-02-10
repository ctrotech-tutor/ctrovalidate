import { useCtrovalidate } from '@ctrovalidate/react';
import { translator } from '@ctrovalidate/core';
import { useState } from 'react';

// 1. Register a dictionary for Spanish
translator.addMessages('es', {
    required: '¡Este campo es obligatorio!',
    minLength: 'Debe tener al menos {0} caracteres.',
    email: 'Por favor, introduce un correo electrónico válido.'
});

interface FormValues {
    username: string;
    email: string;
}

function App() {
    const [currentLocale, setCurrentLocale] = useState('es');

    // 2. Initialize hook
    const { values, errors, handleChange, handleBlur, validateForm, isDirty, reset } = useCtrovalidate<FormValues>({
        schema: {
            username: 'required|minLength:4',
            email: 'required|email'
        },
        initialValues: {
            username: '',
            email: ''
        },
        // We do NOT pass 'messages' here so it uses the global translator
    });

    // 3. Handle locale switching
    const toogleLocale = async () => {
        const newLocale = currentLocale === 'en' ? 'es' : 'en';
        translator.setLocale(newLocale);
        setCurrentLocale(newLocale);

        // 4. IMPORTANT: Re-validate to update existing errors with new language
        await validateForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            alert('Form submitted successfully!');
            console.log('Values:', values);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Ctrovalidate i18n Demo</h1>
                <button
                    onClick={toogleLocale}
                    style={{
                        padding: '8px 16px',
                        background: currentLocale === 'en' ? '#0070f3' : '#ff4757',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Current: {currentLocale.toUpperCase()} (Switch)
                </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        id="username"
                        name="username"
                        value={values.username as string}
                        onChange={(e) => handleChange('username', e.target.value)}
                        onBlur={() => handleBlur('username')}
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                            border: errors.username ? '1px solid red' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.username && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.username}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        id="email"
                        name="email"
                        value={values.email as string}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '5px',
                            border: errors.email ? '1px solid red' : '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    />
                    {errors.email && <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ padding: '8px 16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}>
                        Submit
                    </button>
                    <button type="button" onClick={() => reset()} style={{ padding: '8px 16px', background: '#ccc', border: 'none', borderRadius: '4px' }}>
                        Reset
                    </button>
                </div>
            </form>

            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <h3>State Debugger</h3>
                <pre style={{ overflowX: 'auto' }}>{JSON.stringify({ values, errors, isDirty, locale: currentLocale }, null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
