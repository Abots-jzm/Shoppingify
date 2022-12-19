import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import Items from "./pages/dashboard/Items";
import History from "./pages/dashboard/History";
import Statistics from "./pages/dashboard/Statistics";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

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
				<Route path={paths.ITEMS} element={<Items />} />
				<Route path={paths.HISTORY} element={<History />} />
				<Route path={paths.STATISTICS} element={<Statistics />} />
			</Route>
		</Routes>
	);
}

export default App;
