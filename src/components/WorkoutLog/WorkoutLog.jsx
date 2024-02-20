import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

import { addWorkout } from "../../features/workouts/workoutsSlice";

export default function WorkoutLog() {
	const [userWorkouts, setWorkouts] = useState(
		useSelector((state) => state.users.user.workouts)
	);

	const userId = useSelector((state) => state.users.user.userId);
	const token = useSelector((state) => state.users.user.token);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Making Input Elements Stateless
	const [type, setType] = useState(userWorkouts[0]);
	const [calBurned, setCalBurned] = useState(0);
	const [date, setDate] = useState(new Date().toLocaleDateString("en-ca"));
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [feetClimbed, setFeetClimbed] = useState(0);
	const [gradesArray, setGradesArray] = useState([]);
	const [milesHiked, setMilesHiked] = useState(0);
	const [elevationGain, setElevationGain] = useState(0);
	const [poundsLifted, setPoundsLifted] = useState(0);
	const [milesRan, setMilesRan] = useState(0);
	const [avgPace, setAvgPace] = useState("");
	const [floors, setFloors] = useState(0);
	const [steps, setSteps] = useState(0);
	const [avgHR, setAvgHR] = useState("");
	const [yardsSwam, setYardsSwam] = useState(0);
	const [stroke, setStroke] = useState("");
	const [pool, setPool] = useState(false);
	const [milesWalked, setMilesWalked] = useState(0);

	// Selecting correct unique fields according to workout type

	const renderFields = () => {
		switch (type) {
			case "climb":
				return (
					<>
						<div>
							<label htmlFor="feetClimbed">Feet Climbed:</label>
							<input
								type="number"
								id="feetClimbed"
								value={feetClimbed}
								onChange={({ target }) => setFeetClimbed(target.value)}
							/>
						</div>
						<div>
							<label htmlFor="gradesArray">Grades Array:</label>
							<input
								type="text"
								id="gradesArray"
								value={gradesArray}
								onChange={({ target }) => setGradesArray(target.value)}
							/>
						</div>
					</>
				);
			case "run":
				return (
					<>
						<div>
							<label htmlFor="milesRan">Miles Ran:</label>
							<input
								type="number"
								id="milesRan"
								value={milesRan}
								onChange={({ target }) => setMilesRan(target.value)}
							/>
						</div>
						<div>
							<label htmlFor="avgPace">Average Pace:</label>
							<input
								type="text"
								id="avgPace"
								value={avgPace}
								onChange={({ target }) => setAvgPace(target.value)}
							/>
						</div>
					</>
				);
			case "swim":
				return (
					<>
						<div>
							<label htmlFor="yardsSwam">Yards Swam:</label>
							<input
								type="number"
								id="yardsSwam"
								value={yardsSwam}
								onChange={({ target }) => setYardsSwam(target.value)}
							/>
						</div>
						<div>
							<label htmlFor="stroke">Stroke:</label>
							<input
								type="text"
								id="stroke"
								value={stroke}
								onChange={({ target }) => setStroke(target.value)}
							/>
						</div>
						<div>
							<label htmlFor="pool">Pool:</label>
							<input
								type="checkbox"
								id="pool"
								checked={pool}
								onChange={({ target }) => setPool(target.checked)}
							/>
						</div>
					</>
				);
			case "walk":
				return (
					<>
						<div>
							<label htmlFor="milesWalked">Miles Walked:</label>
							<input
								type="number"
								id="milesWalked"
								value={milesWalked}
								onChange={({ target }) => setMilesWalked(target.value)}
							/>
						</div>
					</>
				);
			case "hike":
				return (
					<>
						<div>
							<label htmlFor="milesHiked">Miles Hiked:</label>
							<input
								type="number"
								id="milesHiked"
								value={milesHiked}
								onChange={({ target }) => setMilesHiked(target.value)}
							/>
						</div>
						<div>
							<label htmlFor="elevationGain">Elevation Gain:</label>
							<input
								type="number"
								id="elevationGain"
								value={elevationGain}
								onChange={({ target }) => setElevationGain(target.value)}
							/>
						</div>
					</>
				);
			case "lift":
				return (
					<>
						<div>
							<label htmlFor="poundsLifted">Pounds Lifted:</label>
							<input
								type="number"
								id="poundsLifted"
								value={poundsLifted}
								onChange={({ target }) => setPoundsLifted(target.value)}
							/>
						</div>
					</>
				);
			case "stairs":
				return (
					<>
						<div>
							<label htmlFor="floors">Floors:</label>
							<input
								type="number"
								id="floors"
								value={floors}
								onChange={({ target }) => setFloors(target.value)}
							/>
						</div>
						<div>
							<label htmlFor="steps">Steps:</label>
							<input
								type="number"
								id="steps"
								value={steps}
								onChange={({ target }) => setSteps(target.value)}
							/>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	// Submitting the Workout to the database

	const handleSubmit = (e) => {
		e.preventDefault();

		const workoutObject = {
			type,
			userId,
			calBurned,
			date,
			startTime,
			endTime,
			token,
		};

		dispatch(addWorkout(workoutObject));

		navigate("/fitness");
	};

	// Checking if JWT is expired

	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	// Return JSX element

	return (
		<>
			{!expired ? (
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="type">Type:</label>
					<select
						id="type"
						value={type}
						onChange={({ target }) => setType(target.value)}
						required
					>
						{userWorkouts.map((workout) => (
							<option key={workout} value={workout}>
								{workout}
							</option>
						))}
					</select>

					<label htmlFor="calBurned">Calories Burned:</label>
					<input
						type="number"
						id="calBurned"
						value={calBurned}
						onChange={({ target }) => setCalBurned(target.value)}
					/>

					<label htmlFor="date">Date:</label>
					<input
						type="date"
						id="date"
						value={date}
						onChange={({ target }) => setDate(target.value)}
						required
					/>

					<label htmlFor="startTime">Start Time:</label>
					<input
						type="time"
						id="startTime"
						value={startTime}
						onChange={({ target }) => setStartTime(target.value)}
						required
					/>

					<label htmlFor="endTime">End Time:</label>
					<input
						type="time"
						id="endTime"
						value={endTime}
						onChange={({ target }) => setEndTime(target.value)}
						required
					/>
					{renderFields()}
					<input type="submit"></input>
				</form>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
