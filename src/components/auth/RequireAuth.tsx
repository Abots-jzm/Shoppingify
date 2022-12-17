import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/index";
import { useAppDispatch } from "../../store/hooks";
import { authActions } from "../../store/authSlice";
import styled from "styled-components";
import SideBar from "../SideBar";

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

	return (
		<>
			{user && (
				<Container>
					<SideBar />
					<Outlet />
				</Container>
			)}
			{!user && <Navigate to="/login" state={{ from: location }} replace />}
		</>
	);
}

export default RequireAuth;

const Container = styled.div`
	display: flex;
`;
