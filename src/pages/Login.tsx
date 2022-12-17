import React, { FormEvent, MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../App";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Layout from "../components/auth/Layout";

function Login() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageIsShown, setErrorMessageIsShown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [guestIsLoading, setGuestIsLoading] = useState(false);
	const [guestErrorMessage, setGuestErrorMessage] = useState("");
	const [guestErrorMessageIsShown, setGuestErrorMessageIsShown] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();
	const prevPath = location.state?.from?.pathname;
	const nextPath = prevPath && prevPath !== paths.LOGIN && prevPath !== paths.SIGNUP ? prevPath : paths.ITEMS;

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		try {
			setIsLoading(true);
			e.preventDefault();
			await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
			setIsLoading(false);
			navigate(nextPath, { replace: true });
		} catch (err: any) {
			setIsLoading(false);
			if (err?.message === "Firebase: Error (auth/wrong-password).") {
				setErrorMessage("Invalid Email or Password");
				setErrorMessageIsShown(true);
			} else {
				setErrorMessage("An unexpected error occured");
				setErrorMessageIsShown(true);
			}
		}
	}

	async function onGuestSubmit(e: MouseEvent<HTMLButtonElement>) {
		try {
			setGuestIsLoading(true);
			await signInAnonymously(auth);
			setIsLoading(false);
			navigate(nextPath, { replace: true });
		} catch (err: any) {
			setIsLoading(false);
			setErrorMessage("An unexpected error occured");
			setErrorMessageIsShown(true);
		}
	}

	return (
		<Layout
			enteredEmail={enteredEmail}
			enteredPassword={enteredPassword}
			errorMessage={errorMessage}
			errorMessageIsShown={errorMessageIsShown}
			guestErrorMessage={guestErrorMessage}
			guestErrorMessageIsShown={guestErrorMessageIsShown}
			isLoading={isLoading}
			guestIsLoading={guestIsLoading}
			handleSubmit={handleSubmit}
			onEmailChange={(e) => setEnteredEmail(e.target.value)}
			onPasswordChange={(e) => setEnteredPassword(e.target.value)}
			onGuestSubmit={onGuestSubmit}
		/>
	);
}

export default Login;
