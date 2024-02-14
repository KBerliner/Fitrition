import React from "react";
import Header from "../Header/Header";
import { Navigate } from "react-router";

export default function Home({ type }) {
	const token = localStorage ? localStorage.getItem("token") : undefined;
	return <>{token ? <Header type={type} /> : <Navigate to="/login" />}</>;
}
