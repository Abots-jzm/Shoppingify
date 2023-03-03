import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import styled, { keyframes } from "styled-components";
import logoSVG from "../../assets/logo.svg";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../App";

type Props = {
	enteredEmail: string;
	enteredPassword: string;
	errorMessage: string;
	errorMessageIsShown: boolean;
	guestErrorMessage?: string;
	guestErrorMessageIsShown?: boolean;
	isLoading: boolean;
	guestIsLoading?: boolean;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onGuestSubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
};

function Layout({
	enteredEmail,
	enteredPassword,
	errorMessage,
	errorMessageIsShown,
	guestErrorMessage,
	guestErrorMessageIsShown,
	isLoading,
	guestIsLoading,
	handleSubmit,
	onEmailChange,
	onPasswordChange,
	onGuestSubmit,
}: Props) {
	const location = useLocation();
	const isLoginPage = location.pathname === paths.LOGIN;

	return (
		<Container>
			<div>
				<Logo>
					<div>
						<img src={logoSVG} alt="logo" />
					</div>
					<div>Shoppingify</div>
				</Logo>
				<SignupText>{isLoginPage ? "Login" : "Sign up"}</SignupText>
				<Form onSubmit={handleSubmit}>
					<div>
						<p>
							<MdEmail />
						</p>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							value={enteredEmail}
							onChange={onEmailChange}
							required
						/>
					</div>
					<div>
						<p>
							<IoMdLock />
						</p>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={enteredPassword}
							onChange={onPasswordChange}
							required
						/>
					</div>
					<LoginBtn type="submit">
						<div>{isLoginPage ? "Login" : "Sign up"}</div>
						{isLoading && <Spinner />}
					</LoginBtn>
				</Form>
				{errorMessageIsShown && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Others>
					{isLoginPage && (
						<>
							<div>or</div>
							<GuestBtn onClick={onGuestSubmit}>
								<span>continue as a guest</span>
								{guestIsLoading && <SpinnerGray />}
							</GuestBtn>
							{guestErrorMessageIsShown && <ErrorMessage>{guestErrorMessage}</ErrorMessage>}
						</>
					)}
					<div style={{ marginTop: isLoginPage ? "3.3rem" : "0" }}>
						{isLoginPage && (
							<>
								Don't have an account yet? <LinkStyles to={paths.SIGNUP}>Register</LinkStyles>
							</>
						)}
						{!isLoginPage && (
							<>
								Already have an account? <LinkStyles to={paths.LOGIN}>Login</LinkStyles>
							</>
						)}
					</div>
				</Others>
			</div>
		</Container>
	);
}

export default Layout;

const spinner = keyframes`
   100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	border-left: 2px solid white;
	animation: ${spinner} 0.7s linear infinite;
`;

const SpinnerGray = styled(Spinner)`
	border-left: 1px solid #828282;
`;

const ErrorMessage = styled.div`
	font-size: 1.4rem;
	color: #ff414e;
	margin-top: 1rem;
`;

const LinkStyles = styled(Link)`
	color: #f9a109;
	text-decoration: none;
`;

const Others = styled.div`
	margin-top: 1.8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #828282;
	font-size: 1.4rem;
`;

const LoginBtn = styled.button`
	padding: 0.8rem;
	background-color: #f9a109;
	color: white;
	border-radius: 8px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

const GuestBtn = styled(LoginBtn)`
	margin-top: 1.8rem;
	border: 1px solid #828282;
	color: #828282;
	background-color: white;
	width: 100%;
	font-weight: 400;
`;

const Form = styled.form`
	margin-top: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;

	& > div {
		position: relative;
	}

	p {
		position: absolute;
		font-size: 2rem;
		top: 0.9rem;
		left: 1.4rem;
		color: #828282;
	}

	input {
		padding: 0.8rem;
		border-radius: 0.8rem;
		border: 1px solid #bdbdbd;
		padding-left: 4.6rem;
		width: 100%;

		&::placeholder {
			color: #828282;
		}
	}
`;

const SignupText = styled.div`
	color: #333;
	font-size: 1.8rem;
	font-weight: 700;
	margin-top: 2.7rem;
`;

const Logo = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;

	div {
		color: #f9a109;
		font-weight: 700;
	}

	div:first-child {
		height: 2.4rem;

		img {
			height: 100%;
		}
	}
`;

const Container = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;

	& > div {
		padding: 4.8rem 5.8rem;
		box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
		border-radius: 1.2rem;
		width: min(47.3rem, 100%);
	}

	@media only screen and (max-width: 473px) {
		place-items: start;
		margin-top: 5vh;
		height: auto;

		& > div {
			box-shadow: none;
			padding: 2rem;
		}
	}
`;
