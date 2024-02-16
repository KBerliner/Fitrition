import React, { useState } from "react";
import styles from "./HamburgerMenu.module.css";

export default function ({ menuItems }) {
	const [showMenu, setShowMenu] = useState(false);
	const [exercises, setExercises] = useState([
		{ name: "General" },
		...menuItems,
	]);

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
						key={exercise.name}
					>
						{exercise.name}
					</li>
				))}
			</ul>
		</>
	);
}
