// Importing Dependencies

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { hash } from "bcryptjs";

// Exporting the Signup Thunk

export const signup = createAsyncThunk("users/signup", async (reqBody) => {
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpsRequest
		let request = new XMLHttpRequest();

		// Hashing the password for secure information transfer

		hash(reqBody.password, 10).then(async (hash) => {
			const user = {
				username: reqBody.username,
				email: reqBody.email,
				password: hash,
			};

			// Opening and Sending API request

			request.open("POST", `${import.meta.env.VITE_API_URL}signup`);
			request.setRequestHeader("Content-type", "application/json");
			request.send(JSON.stringify(user));
		});

		// Returning the result of the Promise

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || request.status === 201) {
					resolve(JSON.parse(request.response));
				} else if (
					JSON.parse(request.response).error.errors?.username?.kind === "unique"
				) {
					alert("The username must be unique!");
					reject(JSON.parse(request.response));
				} else if (
					JSON.parse(request.response).error.errors?.email?.kind === "unique"
				) {
					alert("The email must be unique!");
					reject(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
	});
});

// Exporting the Login Thunk

export const login = createAsyncThunk("users/login", async (reqBody) => {
	return new Promise((resolve, reject) => {
		// hash => {
		const user = {
			email: reqBody.email,
			password: reqBody.password,
		};

		// Defining new XMLHttpsRequest
		let request = new XMLHttpRequest();

		// Opening and Sending API request

		request.open("POST", `${import.meta.env.VITE_API_URL}login`);
		request.setRequestHeader("Content-type", "application/json");
		request.send(JSON.stringify(user));

		// Returning the result of the Promise

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || request.status === 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(request.response);
				}
			}
		};
	});
});

// Exporting the Users Slice

export const usersSlice = createSlice({
	name: "user",
	initialState: {
		// Setting initial state

		user: {
			username: "",
			userId: "",
			workouts: [],
		},
		isLoading: false,
		hasError: false,
	},
	extraReducers: (builder) => {
		builder

			// Handling Fulfilled Signup API request

			.addCase(signup.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				state.user.username = action.payload.username;
				state.user.userId = action.payload.userId;
				state.user.workouts = action.payload.workouts;
				if (localStorage) {
					localStorage.setItem("token", action.payload.token);
				}
			})

			// Handling Pending Signup API request

			.addCase(signup.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Signup API request

			.addCase(signup.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			})

			// Handling Fulfilled Login API request
			.addCase(login.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				state.user.username = action.payload.username;
				state.user.userId = action.payload.userId;
				if (localStorage) {
					localStorage.setItem("token", action.payload.token);
				}
			})

			// Handling Pending Login API request
			.addCase(login.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Login API request
			.addCase(login.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			});
	},
});

// Exporting the Users Reducer to the store

export default usersSlice.reducer;
