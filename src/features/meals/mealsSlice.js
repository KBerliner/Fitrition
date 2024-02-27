// Importing Dependencies

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Exporting the Add Meal thunk

export const addMeal = createAsyncThunk("meals/add", async (reqBody) => {
	const { token, ...body } = reqBody;
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpRequest
		let request = new XMLHttpRequest();

		request.open("POST", `${import.meta.env.VITE_API_URL}meal/add`);
		request.setRequestHeader("Authorization", `Bearer ${token}`);
		request.setRequestHeader("Content-type", "application/json");
		request.send(JSON.stringify(body));

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || request.status === 201) {
					resolve({ ...JSON.parse(request.response), body });
				} else {
					reject(request.response);
				}
			}
		};
	});
});

// Exporting the Change Meal thunk

export const changeMeal = createAsyncThunk("meals/change", async (reqBody) => {
	const { token, ...body } = reqBody;
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpRequest
		let request = new XMLHttpRequest();

		request.open(
			"PUT",
			`${import.meta.env.VITE_API_URL}meal/change/${body.id}`
		);
		request.setRequestHeader("Authorization", `Bearer ${token}`);
		request.setRequestHeader("Content-type", "application/json");

		request.send(body);

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || request.status === 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
	});
});

// Exporting the Delete Meal thunk

export const deleteMeal = createAsyncThunk("meals/delete", async (reqBody) => {
	const { token, ...body } = reqBody;
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpRequest
		let request = new XMLHttpRequest();

		request.open(
			"DELETE",
			`${import.meta.env.VITE_API_URL}meal/delete/${body.id}`
		);
		request.setRequestHeader("Authorization", `Bearer ${token}`);
		request.setRequestHeader("Content-type", "application/json");

		request.send();

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || request.status === 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
	});
});

// Exporting the Get All Meals thunk

export const allMeals = createAsyncThunk("meals/all", async (reqBody) => {
	const { token } = reqBody;
	return new Promise((resolve, reject) => {
		// Defining new XMLHttpRequest
		let request = new XMLHttpRequest();

		request.open("GET", `${import.meta.env.VITE_API_URL}meal/`);
		request.setRequestHeader("Content-type", "application/json");
		request.setRequestHeader("Authorization", `Bearer ${token}`);

		request.send();

		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if (request.status === 200 || request.status === 201) {
					resolve(JSON.parse(request.response));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
	});
});

// Exporting the Meals Slice

export const mealsSlice = createSlice({
	name: "meal",
	// Setting initail state
	initialState: {
		meals: [],
		isLoading: false,
		hasError: false,
	},
	extraReducers: (builder) => {
		builder
			// Handling Fullfilled Add Meal API request
			.addCase(addMeal.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				// Update the state with the added meal
				state.meals.push(action.payload.body);
			})

			// Handling Pending Add Meal API request
			.addCase(addMeal.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Add Meal API request
			.addCase(addMeal.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			})

			// Handling Fullfilled Change Meal API request
			.addCase(changeMeal.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				// Update the state with the modified meal
				const updatedMealIndex = state.meals.findIndex(
					(meal) => meal.id === action.payload.id
				);
				state.meals[updatedMealIndex] = action.payload;
			})

			// Handling Pending Change Meal API request
			.addCase(changeMeal.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Change Meal API request
			.addCase(changeMeal.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			})

			// Handling Fullfilled Delete Meal API request
			.addCase(deleteMeal.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				// Remove the deleted meal from the state
				state.meals = state.meals.filter(
					(meal) => meal.id !== action.payload.id
				);
			})

			// Handling Pending Delete Meal API request
			.addCase(deleteMeal.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Delete Meal API request
			.addCase(deleteMeal.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			})

			// Handling Fullfilled Get All Meals API request
			.addCase(allMeals.fulfilled, (state, action) => {
				state.hasError = false;
				state.isLoading = false;
				// Update the state with the fetched meals
				state.meals = action.payload;
			})

			// Handling Pending Get All Meals API request
			.addCase(allMeals.pending, (state, action) => {
				state.hasError = false;
				state.isLoading = true;
			})

			// Handling Rejected Get All Meals API request
			.addCase(allMeals.rejected, (state, action) => {
				state.hasError = true;
				state.isLoading = false;
			});
	},
});

export default mealsSlice.reducer;
