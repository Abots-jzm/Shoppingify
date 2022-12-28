import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../api/firebase/index";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authActions } from "../../store/slices/authSlice";
import storage from "../../util/storage";
import ShoppingCart from "../cart";
import SideBar from "../SideBar";

function RequireAuth() {
	const user = useAppSelector((state) => state.auth.uid);
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(authActions.login(user.uid));
				storage.set("uid", user.uid);
			} else {
				dispatch(authActions.logout());
				storage.remove("uid");
			}
		});
	}, []);

	return (
		<>
			{user && (
				<Container>
					<SideBar />
					<Outlet />
					<ShoppingCart />
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
