import React from "react";
import styles from "./Header.module.css";
import fitrition from "../../assets/Fitrition.svg";
import placeholderImage from "../../assets/profile_picture_placeholder.svg";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function Header({ type, menuItems }) {
	return (
		<>
			<nav data-testid={type}>
				{type === "nutrition" ? (
					<button className={styles.log_meal_button}>Log a Meal</button>
				) : (
					<HamburgerMenu
						menuItems={menuItems}
						className={styles.hamburger_menu}
					/>
				)}
				<img className={styles.logo} alt="Fitrition Logo" src={fitrition}></img>
				<img
					className={styles.profile}
					alt="Placeholder Profile Image"
					src={placeholderImage}
				></img>
			</nav>
		</>
	);
}
