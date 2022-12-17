import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/index";
import Layout from "../../components/auth/Layout";

function Signup() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageIsShown, setErrorMessageIsShown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		if (enteredPassword.length < 6) {
			setErrorMessage("Password should be at least 6 characters");
			setErrorMessageIsShown(true);
			return;
		}

		try {
			e.preventDefault();
			setIsLoading(true);
			await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
			setIsLoading(false);
			navigate(paths.ITEMS, { replace: true });
		} catch (err: any) {
			setIsLoading(false);
			if (err?.message === "Firebase: Error (auth/email-already-in-use).") {
				setErrorMessage("Email Already exists");
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
			handleSubmit={handleSubmit}
			onEmailChange={(e) => setEnteredEmail(e.target.value)}
			onPasswordChange={(e) => setEnteredPassword(e.target.value)}
		/>
	);
}

export default Signup;
