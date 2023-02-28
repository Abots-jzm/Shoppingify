import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
	mode: "normal" | "two buttons";
	color?: string;
	outlineBtnText?: string;
	FilledBtnText?: string;
	FilledBtnColor?: string;
	addNewItemLoading?: boolean;
	addNewItemError?: boolean;
	onOutlineBtnClicked?: () => void;
	onFilledBtnClicked?: () => void;
};

function CartBottom({
	mode,
	color,
	outlineBtnText,
	FilledBtnColor,
	FilledBtnText,
	addNewItemLoading,
	addNewItemError,
	onOutlineBtnClicked,
	onFilledBtnClicked,
}: Props) {
	if (mode === "two buttons")
		return (
			<Container color={color}>
				<TwoButtonsContainer color={FilledBtnColor}>
					<button type="button" onClick={onOutlineBtnClicked}>
						{outlineBtnText}
					</button>
					<button className="filled" type="submit" onClick={onFilledBtnClicked}>
						{FilledBtnText}
						{addNewItemLoading && <Spinner />}
					</button>
				</TwoButtonsContainer>
				{addNewItemError && <ErrorMessage>An unexpected error occured</ErrorMessage>}
			</Container>
		);

	return (
		<Container color={color}>
			<Normal>
				<input type="text" name="name" id="name" placeholder="Enter a name" required />
				<button type="submit">Save</button>
			</Normal>
		</Container>
	);
}

export default CartBottom;

const ErrorMessage = styled.span`
	color: red;
	font-size: 1.4rem;
	margin-top: 1rem;
	display: grid;
	place-items: center;
`;

const spinner = keyframes`
   100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	border-left: 2px solid white;
	animation: ${spinner} 0.7s linear infinite;
`;

interface ITwoButtons {
	color?: string;
}

const TwoButtonsContainer = styled.div<ITwoButtons>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4.4rem;

	button {
		font-weight: 700;
		color: #34333a;
		outline: none;
		background-color: inherit;
	}

	button.filled {
		color: white;
		padding: 2rem 2.4rem;
		border-radius: 12px;
		background-color: ${(props) => props.color || "#F9A109"};
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
`;

interface IContainer {
	color?: string;
}

const Normal = styled.div`
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

const Container = styled.div<IContainer>`
	background-color: ${(props) => props.color || "white"};
	margin-top: auto;
	padding: 3.5rem 4rem;
	position: relative;

	@media only screen and (max-width: 600px) {
		padding: 1.7rem;
	}
`;
