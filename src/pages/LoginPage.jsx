import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        setError('');
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const fetchResponse = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

            let token = await fetchResponse.json();
            localStorage.setItem('token', token);

            const userDoc = JSON.parse(atob(token.split('.')[1])).user;
            props.setUser(userDoc);

            navigate('/');
        } catch (err) {
            console.log('Login error', err);
            setError('Login Failed - Try Again');
        }
    }

    return (
        <div>
            <div className='form-container' onSubmit={handleSubmit}>
                <form autoComplete='off'>
                    <label>Email</label>
                    <input type='text' name='email' value={email} onChange={handleEmailChange} required />
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={handlePasswordChange} required />
                    <button type='submit'>LOG IN</button>
                </form>
                <p className='error-message'>&nbsp;{error}</p>
            </div>
        </div>
    )
}

export default LoginPage;
