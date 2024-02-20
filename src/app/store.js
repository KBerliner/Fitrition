import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import workoutsReducer from "../features/workouts/workoutsSlice";
import mealsReducer from "../features/meals/mealsSlice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
		workouts: workoutsReducer,
		meals: mealsReducer,
	},
});
