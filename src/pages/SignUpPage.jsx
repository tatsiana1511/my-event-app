import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpPage(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isServiceProvider, setIsServiceProvider] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (evt) => {
        setName(evt.target.value);
        setError('');
    }
    
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
        setError('');
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
        setError('');
    }

    const handleConfirmedPasswordChange = (evt) => {
        setConfirmedPassword(evt.target.value);
        setError('');
    }

    const handleIsServiceProviderChange =(evt) => {
        setIsServiceProvider(evt.target.checked);
    }
    
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const fetchResponse = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ name, email, password, confirmedPassword, isServiceProvider })
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');

            let token = await fetchResponse.json();
            localStorage.setItem('token', token);

            const userDoc = JSON.parse(atob(token.split('.')[1])).user;
            props.setUser(userDoc)

            navigate('/');

        } catch (err) {
            console.log('SignupPage error', err);
            setError('Sign Up Failed - Try Again');
        }
    }

    return (
        <div>
            <div className='form-container' onSubmit={handleSubmit}>
                <form autoComplete='off'>
                    <label>Full Name</label>
                    <input type="text" name="full-name" value={name} onChange={handleNameChange} required />
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleEmailChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
                    <label>Confirm Password</label>
                    <input type="password" name="password" value={confirmedPassword} onChange={handleConfirmedPasswordChange} required />
                    <label>I am a service provider</label>
                    <input type="checkbox" value={isServiceProvider} onChange={handleIsServiceProviderChange} />
                    <button type="submit">SIGN UP</button>
                </form>
            </div>
            <p className='error-message'>&nbsp;{error}</p>
        </div>
    )
}

export default SignUpPage;