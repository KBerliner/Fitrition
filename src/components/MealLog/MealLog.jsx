import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function MealLog() {
	// Making input elements stateless
	const [date, setDate] = useState(new Date().toLocaleDateString("en-ca"));
	const [time, setTime] = useState(
		`${new Date().getHours()}:${new Date().getMinutes()}`
	);
	const [calories, setCalories] = useState(0);
	const [protein, setProtein] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [fats, setFats] = useState(0);
	const [fiber, setFiber] = useState(0);
	const [sugar, setSugar] = useState(0);
	const [sodium, setSodium] = useState(0);
	const [cholesterol, setCholesterol] = useState(0);

	// Getting User Id for API request

	const [userId, setUserId] = useState(
		useSelector((state) => state.users.user.userId)
	);

	// Checking if JWT is expired

	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	// Return JSX element

	return (
		<>
			{!expired ? (
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="date">Date:</label>
					<input
						type="date"
						id="date"
						value={date}
						onChange={({ target }) => setDate(target.value)}
						required
					/>

					<label htmlFor="time">Time:</label>
					<input
						type="time"
						id="time"
						value={time}
						onChange={({ target }) => setTime(target.value)}
						required
					/>

					<label htmlFor="calories">Calories (kCal):</label>
					<input
						type="number"
						id="calories"
						value={calories}
						onChange={({ target }) => setCalories(target.value)}
						min="0"
					/>

					<label htmlFor="protein">Protein (g):</label>
					<input
						type="number"
						id="protein"
						value={protein}
						onChange={({ target }) => setProtein(target.value)}
						min="0"
						required
					/>

					<label htmlFor="carbs">Carbohydrates (g):</label>
					<input
						type="number"
						id="carbs"
						value={carbs}
						onChange={({ target }) => setCarbs(target.value)}
						min="0"
					/>

					<label htmlFor="fats">Fats (g):</label>
					<input
						type="number"
						id="fats"
						value={fats}
						onChange={({ target }) => setFats(target.value)}
						min="0"
					/>

					<label htmlFor="fiber">Fiber (g):</label>
					<input
						type="number"
						id="fiber"
						value={fiber}
						onChange={({ target }) => setFiber(target.value)}
						min="0"
					/>

					<label htmlFor="sugar">Sugar (g):</label>
					<input
						type="number"
						id="sugar"
						value={sugar}
						onChange={({ target }) => setSugar(target.value)}
						min="0"
					/>

					<label htmlFor="sodium">Sodium (mg):</label>
					<input
						type="number"
						id="sodium"
						value={sodium}
						onChange={({ target }) => setSodium(target.value)}
						min="0"
					/>

					<label htmlFor="cholesterol">Cholesterol (mg):</label>
					<input
						type="number"
						id="cholesterol"
						value={cholesterol}
						onChange={({ target }) => setCholesterol(target.value)}
						min="0"
					/>

					<input type="submit"></input>
				</form>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
