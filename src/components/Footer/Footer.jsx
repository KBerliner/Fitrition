import React from "react";
import styles from "./Footer.module.css";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

export default function Footer({ sendTo }) {
	const handleClick = () => {
		const destination = sendTo !== "fitness" ? "/fitness" : "/nutrition";
		console.log(destination);
		return <Navigate to="/nutrition" />;
	};

	return (
		<Link
			to={sendTo !== "fitness" ? "/fitness" : "/nutrition"}
			className={styles.footer_container}
		>
			<h3>{sendTo[0].toUpperCase() + sendTo.slice(1)}</h3>
		</Link>
	);
}
