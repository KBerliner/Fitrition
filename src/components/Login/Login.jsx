import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';

export default function Login() {

    return (
        <>
            <form>
                <h1>Login Here</h1>
                <label htmlFor="email">Email</label>
                <input name="email" type="email" required></input>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" required></input>
                <div>
                    <input name="remember" type="checkbox"></input>
                    <label htmlFor="remember">Remember Me</label>
                    <input name="submit" type="submit" value="Login"></input>
                </div>
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </form>
        </>
    )
}