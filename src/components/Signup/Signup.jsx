// Importing Dependencies

import React, { useState, useRef } from 'react';
import './Signup.module.css';
import { Link, Navigate, redirect } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { signup } from '../../features/users/usersSlice';

// Creating Function Component "Login"

export default function Login() {
    // Assigning Variables

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [disabled, setDisabled] = useState('disabled');

    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const submitButton = useRef(null);

    // Handling form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username,
            email,
            password
        }
        
        dispatch(signup(user));

        return <Navigate to="/nutrition" />;
    }

    // Regex patterns

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const textPattern = /^(?!.*<script).*$/;

    // Regex verification functions

    const verifyEmail = text => {
        return emailPattern.test(text);
    }

    const verifyText = text => {
        return textPattern.test(text)
    }

    // Verifying all fields and presence of content in all fields

    const verifyAll = () => {
        return verifyEmail(emailInput.current.value)
        && verifyText(usernameInput.current.value)
        && verifyText(passwordInput.current.value)
        && emailInput.current.value
        && usernameInput.current.value
        && passwordInput.current.value
    }

    // Handling input in any field

    const handleInput = ({ target }, field) => {
        field === 'username' ? setUsername(target.value)
        : field === 'email' ? setEmail(target.value)
        : field === 'password' ? setPassword(target.value)
        : console.error(`${field} is not a valid field.`);

        if (verifyAll()) {
            submitButton.current.removeAttribute('disabled');
            setDisabled('');
        } else if (submitButton) {
            submitButton.current.setAttribute('disabled', true);
            setDisabled('disabled');
        }
    }

    // Returning JSX component

    return (
        <>
        {
            // Checking if the user is already logged in for persistence
            !localStorage.getItem('token') ?
            <form onSubmit={handleSubmit}>
                <h1>Sign Up Here</h1>
                <label htmlFor="username">Username</label>
                <input ref={usernameInput} id="username" onChange={(e) => {handleInput(e, 'username')}} name="username" type="text" value={username} required></input>
                <label htmlFor="email">Email</label>
                <input ref={emailInput} id="email" onChange={(e) => {handleInput(e, 'email')}} name="email" type="email" value={email} required></input>
                <label htmlFor="password">Password</label>
                <input ref={passwordInput} id="password" onChange={(e) => {handleInput(e, 'password')}} name="password" type="password" value={password} required></input>
                <div>
                    <input name="remember" type="checkbox"></input>
                    <label htmlFor="remember">Remember Me</label>
                    <input ref={submitButton} id="submit" className={disabled} name="submit" type="submit" disabled></input>
                </div>
                <p>Already a user? <Link to="/login">Login here</Link></p>
            </form>
        :
        <Navigate to="/nutrition" />
        }
        </>
    )
}