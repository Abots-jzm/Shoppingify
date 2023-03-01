import React, { FormEvent, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cartActions } from "../../store/slices/cartSlice";

type Props = {
	mode: "normal" | "two buttons";
	color?: string;
	outlineBtnText?: string;
	FilledBtnText?: string;
	FilledBtnColor?: string;
	isLoading?: boolean;
	isError?: boolean;
	onOutlineBtnClicked?: () => void;
	onFilledBtnClicked?: () => void;
	hideFilled?: boolean;
};

function CartBottom({
	mode,
	color,
	outlineBtnText,
	FilledBtnColor,
	FilledBtnText,
	isLoading,
	isError,
	onOutlineBtnClicked,
	onFilledBtnClicked,
	hideFilled,
}: Props) {
	const [enteredListName, setEnteredListName] = useState("");
	const items = useAppSelector((state) => state.cart.items);
	const cartIsEmpty = items.length === 0;
	const dispatch = useAppDispatch();

	function saveListName(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(cartActions.saveList(enteredListName));
	}

	if (mode === "two buttons")
		return (
			<Container color={color}>
				<TwoButtonsContainer color={FilledBtnColor}>
					<button type="button" onClick={onOutlineBtnClicked}>
						{outlineBtnText}
					</button>
					{!hideFilled && (
						<button
							className="filled"
							type={onFilledBtnClicked ? "button" : "submit"}
							onClick={onFilledBtnClicked}
							disabled={isLoading}
						>
							{FilledBtnText}
							{isLoading && <Spinner />}
						</button>
					)}
				</TwoButtonsContainer>
				{isError && <ErrorMessage>An unexpected error occured</ErrorMessage>}
			</Container>
		);

	return (
		<Container color={color}>
			<Normal onSubmit={saveListName}>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Enter a name"
					required
					disabled={cartIsEmpty}
					onChange={(e) => setEnteredListName(e.target.value)}
				/>
				<button type="submit" disabled={cartIsEmpty}>
					Save
				</button>
			</Normal>
		</Container>
	);
}

export default CartBottom;

const ErrorMessage = styled.span`
	color: #eb5757;
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

const Normal = styled.form`
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

		&:disabled {
			border: 2px solid #c1c1c4;
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

		&:disabled {
			background-color: #c1c1c4;
			cursor: not-allowed;
		}
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
