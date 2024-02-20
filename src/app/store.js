import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import workoutsReducer from "../features/workouts/workoutsSlice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
		workouts: workoutsReducer,
	},
});
