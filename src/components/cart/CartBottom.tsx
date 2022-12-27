import React from "react";
import styled from "styled-components";

type Props = {
	mode: "normal";
};

function CartBottom({ mode }: Props) {
	return (
		<Container>
			<input type="text" name="name" id="name" placeholder="Enter a name" required />
			<button type="submit">Save</button>
		</Container>
	);
}

export default CartBottom;

const Container = styled.form`
	background-color: white;
	margin-top: auto;
	padding: 3.5rem 4rem;
	position: relative;

	input {
		border: 2px solid #f9a109;
		border-radius: 12px;
		padding: 2.1rem 10.4rem 2.1rem 1.7rem;
		font-size: 1.4rem;
		width: 100%;

		&:focus,
		&:active {
			outline: none;
		}

		&::placeholder {
			color: #bdbdbd;
		}
	}

	button {
		position: absolute;
		right: 4rem;
		top: 3.5rem;
		bottom: 3.5rem;
		border-radius: 12px;
		background-color: #f9a109;
		color: white;
		padding: 0 2.5rem;
	}

	@media only screen and (max-width: 600px) {
		padding: 1.7rem;

		input {
			padding: 2.1rem 10.4rem 2.1rem 1.7rem;
		}

		button {
			top: 1.7rem;
			right: 1.7rem;
			bottom: 1.7rem;
		}
	}
`;
