import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/fitness" element={<Home type="fitness" />} />
				<Route path="/nutrition" element={<Home type="nutrition" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/" element={<Navigate to="/nutrition" />} />
			</Routes>
		</>
	);
}

export default App;
