import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export enum paths {
	SIGNUP = "/signup",
	LOGIN = "/login",
	ITEMS = "/items",
	HISTORY = "/history",
	STATISTICS = "/statistics",
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={paths.ITEMS} replace />} />
			<Route path={paths.SIGNUP} element={<Signup />} />
			<Route path={paths.LOGIN} element={<Login />} />
		</Routes>
	);
}

export default App;
