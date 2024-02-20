import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import WorkoutLog from "./components/WorkoutLog/WorkoutLog.jsx";
import MealLog from "./components/MealLog/MealLog.jsx";
import Profile from "./components/Profile/Profile.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/fitness/:exercise" element={<Home type="fitness" />} />
				<Route path="/nutrition" element={<Home type="nutrition" />} />
				<Route path="/log-workout" element={<WorkoutLog />} />
				<Route path="/log-meal" element={<MealLog />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/" element={<Navigate to="/nutrition" />} />
			</Routes>
		</>
	);
}

export default App;
