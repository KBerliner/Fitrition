import React from "react";
import styles from "./WorkoutLog.module.css";
import { Navigate } from "react-router";
import Login from "../Login/Login";

export default function WorkoutLog() {
	const token = localStorage ? localStorage.getItem("token") : undefined;
	const expired = localStorage.getItem("expiration") <= new Date().getTime();

	const getTime = (e) => {
		e.preventDefault();

		const time = new Date().getTime();
	};

	return (
		<>
			{!expired ? (
				<form>
					<label htmlFor="type">Type</label>
					<select name="type"></select>
					<button onClick={(e) => getTime(e)} />
				</form>
			) : (
				<Navigate to={"/login"} />
			)}
		</>
	);
}
