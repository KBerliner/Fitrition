import React from "react";
import Header from "../Header/Header";
import { Navigate } from "react-router";
import Footer from "../Footer/Footer";

export default function Home({ type }) {
	const token = localStorage ? localStorage.getItem("token") : undefined;
	return (
		<>
			{token ? (
				<div>
					<Header type={type} />
					<Footer sendTo={type} />
				</div>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
