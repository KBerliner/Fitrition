import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/users/usersSlice";

export default function Login() {
	// Assigning Variables

	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [disabled, setDisabled] = useState("disabled");
	const [stateUsername, setStateUsername] = useState(
		useSelector((state) => state.users.user.username)
	);

	const emailInput = useRef(null);
	const passwordInput = useRef(null);
	const submitButton = useRef(null);

	// Handling input in any field

	const handleInput = ({ target }, field) => {
		field === "password"
			? setPassword(target.value)
			: field === "email"
				? setEmail(target.value)
				: console.error(`${field} is not a valid field.`);

		if (verifyAll()) {
			submitButton.current.removeAttribute("disabled");
			setDisabled("");
		} else if (submitButton) {
			submitButton.current.setAttribute("disabled", true);
			setDisabled("disabled");
		}
	};

	// Handling form submission

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("HIT");

		const user = {
			email,
			password,
		};

		dispatch(login(user));
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
			verifyText(passwordInput.current.value) &&
			emailInput.current.value &&
			passwordInput.current.value
		);
	};

	// Checking Token Expiration

	const expired = localStorage.getItem("expiration") <= new Date().getTime();

	// Returning JSX component

	return (
		<>
			{
				// Checking if the user is already logged in for persistence
				!localStorage.getItem("token") || expired ? (
					<form onSubmit={handleSubmit}>
						<h1>Login Here</h1>
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
							Don't have an account? <Link to="/signup">Sign up here</Link>
						</p>
					</form>
				) : (
					<Navigate data-testid="navigateElement" to="/nutrition" />
				)
			}
		</>
	);
}
