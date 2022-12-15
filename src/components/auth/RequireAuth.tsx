import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/index";
import { useAppDispatch } from "../../store/hooks";
import { authActions } from "../../store/authSlice";

function RequireAuth() {
	const user = useAppSelector((state) => state.uid);
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(authActions.login(user.uid));
				localStorage.setItem("uid", JSON.stringify(user.uid));
			} else {
				dispatch(authActions.logout());
				localStorage.removeItem("uid");
			}
		});
	}, []);

	return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
