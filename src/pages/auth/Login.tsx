import { FormEvent, MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../App";
import Layout from "../../components/auth/Layout";
import useGuestLogin from "../../hooks/auth/useGuestLogin";
import useLogin from "../../hooks/auth/useLogin";

function Login() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");

	const { mutate: login, isLoading, isError } = useLogin();
	const [errorMessage, setErrorMessage] = useState("");

	const { mutate: guestLogin, isLoading: guestIsLoading, isError: guestIsError } = useGuestLogin();
	const [guestErrorMessage, setGuestErrorMessage] = useState("");

	const navigate = useNavigate();
	const location = useLocation();
	const prevPath = location.state?.from?.pathname;
	const nextPath = prevPath && prevPath !== paths.LOGIN && prevPath !== paths.SIGNUP ? prevPath : paths.ITEMS;

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		login(
			{
				email: enteredEmail,
				password: enteredPassword,
			},
			{
				onSuccess() {
					navigate(nextPath, { replace: true });
				},
				onError(err: any) {
					if (err?.message === "Firebase: Error (auth/wrong-password).") setErrorMessage("Invalid Email or Password");
					else setErrorMessage("An unexpected error occured");
				},
			}
		);
	}

	async function onGuestSubmit(e: MouseEvent<HTMLButtonElement>) {
		guestLogin(undefined, {
			onSuccess() {
				navigate(nextPath, { replace: true });
			},
			onError() {
				setGuestErrorMessage("An unexpected error occured");
			},
		});
	}

	return (
		<Layout
			enteredEmail={enteredEmail}
			enteredPassword={enteredPassword}
			errorMessage={errorMessage}
			errorMessageIsShown={isError}
			guestErrorMessage={guestErrorMessage}
			guestErrorMessageIsShown={guestIsError}
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
