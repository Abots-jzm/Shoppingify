import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../App";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Layout, { LinkStyles } from "../components/auth/Layout";

function Login() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageIsShown, setErrorMessageIsShown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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

	return (
		<Layout
			enteredEmail={enteredEmail}
			enteredPassword={enteredPassword}
			errorMessage={errorMessage}
			errorMessageIsShown={errorMessageIsShown}
			isLoading={isLoading}
			text="Login"
			otherAccountsText="continue"
			handleSubmit={handleSubmit}
			onEmailChange={(e) => setEnteredEmail(e.target.value)}
			onPasswordChange={(e) => setEnteredPassword(e.target.value)}
		>
			Don't have an account yet? <LinkStyles to={paths.SIGNUP}>Register</LinkStyles>
		</Layout>
	);
}

export default Login;
