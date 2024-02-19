import React from "react";
import styles from "./WorkoutLog.module.css";
import { Navigate } from "react-router";
import Login from "../Login/Login";

export default function WorkoutLog() {
	const token = localStorage ? localStorage.getItem("token") : undefined;

	return (
		<>
			{token ? (
				<form>
					<label for="type">Type</label>
					<select name="type"></select>
				</form>
			) : (
				<Navigate to={<Login />} />
			)}
		</>
	);
}
