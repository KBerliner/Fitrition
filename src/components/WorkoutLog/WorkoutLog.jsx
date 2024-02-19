import React from "react";
import styles from "./WorkoutLog.module.css";

export default function WorkoutLog() {
	return (
		<>
			<form>
				<label for="type">Type</label>
				<select name="type"></select>
			</form>
		</>
	);
}
