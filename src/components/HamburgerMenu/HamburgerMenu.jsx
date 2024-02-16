import React, { useState } from "react";
import styles from "./HamburgerMenu.module.css";

export default function ({ menuItems }) {
	const [showMenu, setShowMenu] = useState(false);

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
				{menuItems
					? menuItems.map((item) => (
							<li className={styles.menu_item} key={item.name}>
								{item.name}
							</li>
						))
					: undefined}
			</ul>
		</>
	);
}
