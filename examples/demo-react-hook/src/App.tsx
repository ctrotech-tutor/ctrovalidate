import { useCtrovalidate } from '@ctrovalidate/react';

interface FormValues {
  username: string;
  email: string;
}

function App() {
    const { values, errors, handleChange, handleBlur, validateForm, isDirty, reset } = useCtrovalidate<FormValues>({
        schema: {
            username: 'required|minLength:4',
            email: 'required|email'
        },
        initialValues: {
            username: '',
            email: ''
        },
        messages: {
            username: 'Please choose a longer identifier (min 4 chars).',
            email: 'A valid email is required for secure relay.'
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            alert('Form submitted successfully!');
            console.log('Values:', values);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Ctrovalidate React Hook Demo</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        id="username"
                        name="username"
                        value={values.username as string}
                        onChange={(e) => handleChange('username', e.target.value)}
                        onBlur={() => handleBlur('username')}
                        style={{ border: errors.username ? '1px solid red' : '1px solid #ccc' }}
                    />
                    {errors.username && <div style={{ color: 'red', fontSize: '12px' }}>{errors.username}</div>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        id="email"
                        name="email"
                        value={values.email as string}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        style={{ border: errors.email ? '1px solid red' : '1px solid #ccc' }}
                    />
                    {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>}
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={() => reset()} style={{ marginLeft: '10px' }}>Reset</button>
            </form>

            <div style={{ marginTop: '30px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                <h3>State Debugger</h3>
                <pre>{JSON.stringify({ values, errors, isDirty }, null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
