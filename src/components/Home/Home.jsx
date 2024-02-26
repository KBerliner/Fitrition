import React from "react";
import styles from "./Home.module.css";
import Header from "../Header/Header";
import { Navigate, useParams } from "react-router";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import LineGraph from "../LineGraph/LineGraph";

export default function Home({ type }) {
	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	const menuItems = useSelector((state) => state.users.user.workouts);

	const workoutHistory = useSelector((state) => state.workouts.workouts);
	const loadingWorkouts = useSelector((state) => state.workouts.isLoading);

	// Deciding which graphs to display

	let display =
		type === "fitness"
			? useParams().exercise
			: type === "nutrition"
				? "nutrition"
				: undefined;

	const renderGraphs = () => {
		for (let i = 0; i < menuItems.length; i++) {
			return (
				<LineGraph
					chartData={workoutHistory.filter(
						(workout) => workout.type === menuItems[i]
					)}
				/>
			);
		}
	};

	return (
		<>
			{!expired ? (
				<div className={styles.home_container}>
					<Header type={type} menuItems={menuItems} />
					<div className={styles.graph_grid_container}>
						{workoutHistory.length > 0 &&
						!loadingWorkouts &&
						display === "general" ? (
							menuItems.map((menuItem, index) => {
								if (index < 4) {
									return (
										<div key={index}>
											<LineGraph
												key={index}
												chartData={workoutHistory.filter(
													(workout) => workout.type === menuItems[index]
												)}
												chartType={display}
											/>
											<h3>
												{menuItem.charAt(0).toUpperCase() +
													menuItem.slice(1) +
													"s"}
											</h3>
										</div>
									);
								}
							})
						) : !loadingWorkouts ? (
							<h2 className={styles.no_workouts}>No workouts logged yet!</h2>
						) : (
							<h2>Loading...</h2>
						)}
					</div>
					<Footer sendTo={type} />
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
