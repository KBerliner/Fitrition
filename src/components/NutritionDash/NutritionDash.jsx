import React from "react";
import styles from "./NutritionDash.module.css";
import LineGraph from "../LineGraph/LineGraph";

export default function NutritionDash({ exercise }) {
	return (
		<div className={styles.grid_container}>
			<LineGraph />
			<LineGraph />
			<LineGraph />
			<LineGraph />
		</div>
	);
}
