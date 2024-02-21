import React, { useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { useNavigate } from "react-router-dom";

export default function ({ menuItems }) {
	const [showMenu, setShowMenu] = useState(false);
	const [exercises, setExercises] = useState(["General", ...menuItems]);

	const navigate = useNavigate();

	const handleClick = (name) => {
		navigate(`/fitness/${name.toLowerCase()}`);
	};

	const handleLog = () => {
		navigate("/log-workout");
	};

	return (
		<>
			<div
				onClick={() => setShowMenu(!showMenu)}
				className={`${styles.menu_icon} ${showMenu ? styles.menu_icon_showing : ""}`}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul className={`${styles.menu_items} ${showMenu ? styles.showMenu : ""}`}>
				{exercises.map((exercise) => (
					<li
						className={`${styles.menu_item} ${showMenu ? styles.menu_item_showing : ""}`}
						key={exercise}
						onClick={() => {
							handleClick(exercise);
						}}
					>
						{exercise.charAt(0).toUpperCase() + exercise.slice(1)}
					</li>
				))}
			</ul>
			<div
				className={`${styles.log_workout_button_container} ${showMenu ? styles.log_workout_button_container_showing : ""}`}
			>
				<button
					className={`${styles.log_workout_button} ${showMenu ? styles.log_workout_button_showing : ""}`}
					onClick={() => handleLog()}
				>
					{showMenu ? "Log a Workout" : ""}
				</button>
			</div>
		</>
	);
}
