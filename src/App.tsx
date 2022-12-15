import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./components/auth/RequireAuth";

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
			<Route element={<RequireAuth />}>
				<Route path={paths.ITEMS} element={<p>items</p>} />
			</Route>
		</Routes>
	);
}

export default App;
