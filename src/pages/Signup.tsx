import React from "react";
import styled from "styled-components";
import logoSVG from "../assets/logo.svg";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { ImFacebook2, ImGoogle, ImTwitter, ImGithub } from "react-icons/im";
import { Link } from "react-router-dom";
import { paths } from "../App";

function Signup() {
	return (
		<Container>
			<div>
				<Logo>
					<div>
						<img src={logoSVG} alt="logo" />
					</div>
					<div>Shoppingify</div>
				</Logo>
				<SignupText>Signup</SignupText>
				<Form>
					<div>
						<p>
							<MdEmail />
						</p>
						<input type="email" name="email" id="email" placeholder="Email" />
					</div>
					<div>
						<p>
							<IoMdLock />
						</p>
						<input type="password" name="password" id="password" placeholder="Password" />
					</div>
					<button type="submit">Sign up</button>
				</Form>
				<Others>
					<div>or register with these social profiles</div>
					<Socials>
						<button>
							<ImGoogle />
						</button>
						<button>
							<ImFacebook2 />
						</button>
						<button>
							<ImTwitter />
						</button>
						<button>
							<ImGithub />
						</button>
					</Socials>
					<div>
						Already have an account? <LinkStyles to={paths.LOGIN}>Login</LinkStyles>
					</div>
				</Others>
			</div>
		</Container>
	);
}

export default Signup;

const LinkStyles = styled(Link)`
	color: #f9a109;
	text-decoration: none;
`;

const Socials = styled.div`
	margin: 2.2rem 0 3.3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;

	button {
		display: grid;
		place-items: center;
		width: 4.2rem;
		height: 4.2rem;
		border-radius: 50%;
		border: 1px solid #828282;
		color: #828282;
		background-color: white;
		font-size: 1.6rem;
	}
`;

const Others = styled.div`
	margin-top: 3.2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #828282;
	font-size: 1.4rem;
`;

const Form = styled.div`
	margin-top: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;

	button {
		padding: 0.8rem;
		background-color: #f9a109;
		color: white;
		border-radius: 8px;
		font-weight: 700;
	}

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
		/* border: 1px solid #bdbdbd; */
		box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
		border-radius: 1.2rem;
		width: min(47.3rem, 100%);

		@media only screen and (max-width: 473px) {
			/* border: none; */
			box-shadow: none;
			padding: 2rem;
		}
	}
`;
