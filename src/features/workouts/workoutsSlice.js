// Importing Dependencies

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Exporting the Add Workout thunk

export const addWorkout = createAsyncThunk("workouts/add", async (reqBody) => {
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpRequest
		let request = new XMLHttpRequest();

		request.open("POST", `${import.meta.env.VITE_API_URL}workout/add`);
		request.setRequestHeader(
			"Authorization",
			`Bearer ${useSelector((state) => state.users.user.token)}`
		);
		request.setRequestHeader("Content-type", "application/json");
		request.send(JSON.stringify(reqBody));

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
	});
});

// Exporting the Change Workout thunk

export const changeWorkout = createAsyncThunk(
	"workouts/change",
	async (reqBody) => {
		return new Promise((resolve, reject) => {
			// Defining new XMLHttpRequest
			let request = new XMLHttpRequest();

			request.open(
				"PUT",
				`${import.meta.env.VITE_API_URL}workout/change/${reqBody.id}`
			);
			request.setRequestHeader(
				"Authorization",
				`Bearer ${useSelector((state) => state.users.user.token)}`
			);
			request.setRequestHeader("Content-type", "application/json");

			request.send(reqBody.newWorkout);

			request.onreadystatechange = () => {
				if (request.readyState === 4) {
					if (request.status === 200 || 201) {
						resolve(JSON.parse(request.response));
					} else {
						reject(JSON.parse(request.response));
					}
				}
			};
		});
	}
);

// Exporting the Delete Workout thunk

export const deleteWorkout = createAsyncThunk(
	"workouts/delete",
	async (reqBody) => {
		return new Promise((resolve, reject) => {
			// Defining new XMLHttpRequest
			let request = new XMLHttpRequest();

			request.open(
				"DELETE",
				`${import.meta.env.VITE_API_URL}workout/delete/${reqBody.id}`
			);
			request.setRequestHeader("Content-type", "application/json");
			request.setRequestHeader(
				"Authorization",
				`Bearer ${useSelector((state) => state.users.user.token)}`
			);

			request.onreadystatechange = () => {
				if (request.readyState === 4) {
					if (request.status === 200 || 201) {
						resolve(JSON.parse(request.response));
					} else {
						reject(JSON.parse(request.response));
					}
				}
			};
		});
	}
);

// Exporting the Get Workouts of Type thunk

export const allWorkoutsOfType = createAsyncThunk(
	"workouts/allOfType",
	async (reqBody) => {
		return new Promise((resolve, reject) => {
			// Defining new XMLHttpRequest
			let request = new XMLHttpRequest();

			request.open(
				"GET",
				`${import.meta.env.VITE_API_URL}workout/all/${reqBody.type}`
			);
			request.setRequestHeader("Content-type", "application/json");
			request.setRequestHeader(
				"Authorization",
				`Bearer ${useSelector((state) => state.users.user.token)}`
			);

			request.onreadystatechange = () => {
				if (request.readyState === 4) {
					if (request.status === 200 || 201) {
						resolve(JSON.parse(request.response));
					} else {
						reject(JSON.parse(request.response));
					}
				}
			};
		});
	}
);

// Exporting the Get All Workouts thunk

export const allWorkouts = createAsyncThunk("workouts/all", async (reqBody) => {
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpRequest
		let request = new XMLHttpRequest();

		request.open("GET", `${import.meta.env.VITE_API_URL}workout/all`);
		request.setRequestHeader("Content-type", "application/json");
		request.setRequestHeader(
			"Authorization",
			`Bearer ${useSelector((state) => state.users.user.token)}`
		);

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
	});
});

// Exporting the Workouts Slice

export const workoutsSlice = createSlice({
	name: "workout",
	// Setting initial state
	initialState: {
		workouts: [],
		isLoading: false,
		hasError: false,
	},
	extraReducers: (builder) => {
		builder

			// Handling Fullfilled Workout Add API request
			.addCase(addWorkout.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				state.workouts.workouts.push(action.payload);
			})

			// Handling Pending Workout Add API request
			.addCase(addWorkout.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Workout API request
			.addCase(addWorkout.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			});
	},
});
