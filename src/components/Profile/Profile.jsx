import React from "react";
import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import placeholderImage from "../../assets/profile_picture_placeholder.svg";

export default function Profile() {
	// Getting Profile Information
	const user = useSelector((state) => state.users.user);

	// Handling Information Change

	// Checking JWT expiration
	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	// Returning JSX element
	return (
		<>
			{!expired ? (
				<div className={styles.profile_container}>
					<div className={styles.profile_information_container}>
						<img
							className={styles.profile_picture}
							src={placeholderImage}
							alt="Profile Picture"
						/>
						<h2>{user.username}</h2>
						<button>Change Information</button>
						<section className={styles.profile_information}>
							<ul>
								{user.workouts.map((workout) => (
									<li key={workout}>{workout}</li>
								))}
							</ul>
						</section>
					</div>
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
