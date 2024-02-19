import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function WorkoutLog() {
	const [workouts, setWorkouts] = useState(
		useSelector((state) => state.users.user.workouts)
	);

	const expired =
		useSelector((state) => state.users.user.expiration) <= new Date().getTime();

	return (
		<>
			{!expired ? (
				<form>
					<label htmlFor="type">Type</label>
					<select name="type" id="type">
						{workouts.map((workout) => (
							<option key={workout}>{workout}</option>
						))}
					</select>

					<label htmlFor="calBurned">Calories Burned</label>
					<input
						type="text"
						id="calBurned"
						name="calBurned"
						placeholder="Input2"
					/>

					<label htmlFor="input3">Date</label>
					<input type="text" id="date" name="date" placeholder="Input3" />

					<label htmlFor="input4">Start Time</label>
					<input type="text" id="input4" name="input4" placeholder="Input4" />

					<label htmlFor="input5">End Time</label>
					<input type="text" id="input5" name="input5" placeholder="Input5" />

					<label htmlFor="input6">Feet Climbed</label>
					<input type="text" id="input6" name="input6" placeholder="Input6" />

					<label htmlFor="input7">Grades</label>
					<input type="text" id="input7" name="input7" placeholder="Input7" />

					<label htmlFor="input8">Miles Hiked</label>
					<input type="text" id="input8" name="input8" placeholder="Input8" />

					<label htmlFor="input9">Elevation Gain</label>
					<input type="text" id="input9" name="input9" placeholder="Input9" />

					<label htmlFor="input10">Pounds Lifted</label>
					<input
						type="text"
						id="input10"
						name="input10"
						placeholder="Input10"
					/>

					<label htmlFor="input11">Miles Ran</label>
					<input
						type="text"
						id="input11"
						name="input11"
						placeholder="Input11"
					/>

					<label htmlFor="input12">Average Pace</label>
					<input
						type="text"
						id="input12"
						name="input12"
						placeholder="Input12"
					/>

					<label htmlFor="input13">Floors</label>
					<input
						type="text"
						id="input13"
						name="input13"
						placeholder="Input13"
					/>

					<label htmlFor="input14">Steps</label>
					<input
						type="text"
						id="input14"
						name="input14"
						placeholder="Input14"
					/>

					<label htmlFor="input15">Average Heart Rate</label>
					<input
						type="text"
						id="input15"
						name="input15"
						placeholder="Input15"
					/>

					<label htmlFor="input16">Yards Swam</label>
					<input
						type="text"
						id="input16"
						name="input16"
						placeholder="Input16"
					/>

					<label htmlFor="input17">Stroke</label>
					<input
						type="text"
						id="input17"
						name="input17"
						placeholder="Input17"
					/>

					<label htmlFor="input18">Pool</label>
					<input
						type="text"
						id="input18"
						name="input18"
						placeholder="Input18"
					/>

					<label htmlFor="input19">Miles Walked</label>
					<input
						type="text"
						id="input19"
						name="input19"
						placeholder="Input19"
					/>
				</form>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
