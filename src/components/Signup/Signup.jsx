import React, { useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';

export default function Login() {

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(e.target);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up Here</h1>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" required></input>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" required></input>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" required></input>
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