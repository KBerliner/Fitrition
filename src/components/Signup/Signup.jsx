import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import { Link, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserId, signup } from '../../features/users/usersSlice';


export default function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username,
            email,
            password
        }
        
        dispatch(signup(user));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up Here</h1>
                <label htmlFor="username">Username</label>
                <input onChange={({ target }) => setUsername(target.value)} name="username" type="text" value={username} required></input>
                <label htmlFor="email">Email</label>
                <input onChange={({ target }) => setEmail(target.value)} name="email" type="email" value={email} required></input>
                <label htmlFor="password">Password</label>
                <input onChange={({ target }) => setPassword(target.value)} name="password" type="password" value={password} required></input>
                <div>
                    <input name="remember" type="checkbox"></input>
                    <label htmlFor="remember">Remember Me</label>
                    <input name="submit" type="submit"></input>
                </div>
                <p>Already a user? <Link to="/login">Login here</Link></p>
            </form>
        </>
    )
}