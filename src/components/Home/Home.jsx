import React from "react";
import Header from "../Header/Header";
import { Navigate } from "react-router";
import Footer from "../Footer/Footer";

export default function Home({ type }) {
	const expired = localStorage.getItem("expiration") <= new Date().getTime();

	const menuItems = [
		{
			name: "Lifting",
		},
		{
			name: "Climbing",
		},
		{
			name: "Swimming",
		},
		{
			name: "Running",
		},
		{
			name: "Hiking",
		},
		{
			name: "Yoga",
		},
		{
			name: "Pilates",
		},
		{
			name: "Biking",
		},
	];

	return (
		<>
			{!expired ? (
				<div>
					<Header type={type} menuItems={menuItems} />
					<Footer sendTo={type} />
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
