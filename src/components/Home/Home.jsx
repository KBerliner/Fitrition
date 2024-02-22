import React from "react";
import styles from "./Home.module.css";
import Header from "../Header/Header";
import { Navigate } from "react-router";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import LineGraph from "../LineGraph/LineGraph";

export default function Home({ type }) {
	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	const menuItems = useSelector((state) => state.users.user.workouts);

	const workoutHistory = useSelector((state) => state.workouts.workouts);

	return (
		<>
			{!expired ? (
				<div>
					<Header type={type} menuItems={menuItems} />
					{workoutHistory.length > 0 ? (
						<div className={styles.graph_grid_container}>
							<LineGraph chartType="general" chartData={workoutHistory[0]} />
						</div>
					) : (
						<h2 className={styles.no_workouts}>No workouts logged yet!</h2>
					)}
					<Footer sendTo={type} />
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
