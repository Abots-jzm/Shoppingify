import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../store/hooks";

function ShoppingCart() {
	const cartIsOpen = useAppSelector((state) => state.cart.cartIsOpen);

	return (
		<Container cartIsOpen={cartIsOpen}>
			<div />
			<div>ShoppingCart</div>
		</Container>
	);
}

export default ShoppingCart;

interface IContainer {
	cartIsOpen: boolean;
}

const Container = styled.div<IContainer>`
	flex: 0 0 35rem;
	position: sticky;
	top: 0;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);

	& > div {
		background-color: #fff0de;
		width: 100%;
		height: 100%;
	}

	@media only screen and (max-width: 900px) {
		display: ${(props) => (props.cartIsOpen ? "flex" : "none")};
		position: fixed;
		inset: 0;
		justify-content: space-between;

		div:first-child {
			flex: 0 0 9.3rem;
		}

		div:last-child {
			flex: 0 1 35rem;
		}
	}

	@media only screen and (max-width: 600px) {
		div:first-child {
			flex: 0 0 6.2rem;
		}

		div:last-child {
			flex: 0 1 31.5rem;
		}
	}
`;
