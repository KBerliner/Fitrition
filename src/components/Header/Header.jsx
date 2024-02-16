import React from "react";
import styles from "./Header.module.css";
import fitrition from "../../assets/Fitrition.svg";
import placeholderImage from "../../assets/profile_picture_placeholder.svg";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function Header({ type }) {
	return (
		<>
			<nav data-testid={type}>
				{type === "nutrition" ? (
					<button>Log a Meal</button>
				) : (
					<HamburgerMenu className={styles.hamburger_menu} />
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
