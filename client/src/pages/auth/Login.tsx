import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage('Login successful!');
                navigate('/');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting..' : 'Login'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </section>
    );
};

export default Login;
