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

	// Sorting the workout history by date
	const compareDates = (a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return dateA - dateB;
	};

	const sortedWorkoutHistory = [...workoutHistory].sort(compareDates);

	// Getting Nutrition Info

	const mealHistory = useSelector((state) => state.meals.meals);
	const loadingMeals = useSelector((state) => state.meals.isLoading);

	// Sorting the meal history by date

	const sortedMealHistory = [...mealHistory].sort(compareDates);

	// Deciding which graphs to display

	let display = useParams()?.exercise;

	// Rendering the correct data for the graphs

	const render = () => {
		if (type === "fitness") {
			if (workoutHistory.length > 0 && !loadingWorkouts) {
				return (
					<LineGraph
						chartData={sortedWorkoutHistory}
						chartType={display}
						generalData={menuItems}
					/>
				);
			} else if (loadingWorkouts) {
				return <h2>Loading...</h2>;
			} else {
				return <h2 className={styles.no_workouts}>No workouts logged yet!</h2>;
			}
		} else if (type === "nutrition") {
			if (mealHistory.length > 0 && !loadingMeals) {
				return (
					<LineGraph chartData={sortedMealHistory} chartType="nutrition" />
				);
			}
		}
	};

	// Returning the JSX Component

	return (
		<>
			{!expired ? (
				<div className={styles.home_container}>
					<Header type={type} menuItems={menuItems} />
					<div className={styles.graph_grid_container}>{render()}</div>
					<Footer sendTo={type} />
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
