// Importing Dependencies

import React, { useState, useRef, useEffect } from "react";
import "./Signup.module.css";
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../features/users/usersSlice";
import { set } from "mongoose";

// Creating Function Component "Login"

export default function Login() {
	// Assigning Variables

	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [disabled, setDisabled] = useState("disabled");
	const [stateUsername, setStateUsername] = useState(
		useSelector((state) => state.users.user.username)
	);

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
			password,
		};

		dispatch(signup(user));
	};

	// Redirecting after successful submission

	useEffect(() => {
		return stateUsername ? <Navigate to="/nutrition" /> : undefined;
	}, [stateUsername]);

	// Regex patterns

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const textPattern = /^(?!.*<script).*$/;

	// Regex verification functions

	const verifyEmail = (text) => {
		return emailPattern.test(text);
	};

	const verifyText = (text) => {
		return textPattern.test(text);
	};

	// Verifying all fields and presence of content in all fields

	const verifyAll = () => {
		return (
			verifyEmail(emailInput.current.value) &&
			verifyText(usernameInput.current.value) &&
			verifyText(passwordInput.current.value) &&
			emailInput.current.value &&
			usernameInput.current.value &&
			passwordInput.current.value
		);
	};

	// Handling input in any field

	const handleInput = ({ target }, field) => {
		field === "username"
			? setUsername(target.value)
			: field === "email"
				? setEmail(target.value)
				: field === "password"
					? setPassword(target.value)
					: console.error(`${field} is not a valid field.`);

		if (verifyAll()) {
			submitButton.current.removeAttribute("disabled");
			setDisabled("");
		} else if (submitButton) {
			submitButton.current.setAttribute("disabled", true);
			setDisabled("disabled");
		}
	};

	// Checking Token Expiration

	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	// Returning JSX component

	return (
		<>
			{
				// Checking if the user is already logged or if the token is expired
				!useSelector((state) => state.users.user.token) || expired ? (
					<form onSubmit={handleSubmit}>
						<h1>Sign Up Here</h1>
						<label htmlFor="username">Username</label>
						<input
							data-testid="usernameInput"
							ref={usernameInput}
							id="username"
							onChange={(e) => {
								handleInput(e, "username");
							}}
							name="username"
							type="text"
							value={username}
							required
						></input>
						<label htmlFor="email">Email</label>
						<input
							data-testid="emailInput"
							ref={emailInput}
							id="email"
							onChange={(e) => {
								handleInput(e, "email");
							}}
							name="email"
							type="email"
							value={email}
							required
						></input>
						<label htmlFor="password">Password</label>
						<input
							data-testid="passwordInput"
							ref={passwordInput}
							id="password"
							onChange={(e) => {
								handleInput(e, "password");
							}}
							name="password"
							type="password"
							value={password}
							required
						></input>
						<div>
							<input
								data-testid="submitButton"
								ref={submitButton}
								id="submit"
								className={disabled}
								name="submit"
								type="submit"
								disabled
							></input>
						</div>
						<p>
							Already a user? <Link to="/login">Login here</Link>
						</p>
					</form>
				) : (
					<Navigate data-testid="navigateElement" to="/nutrition" />
				)
			}
		</>
	);
}
