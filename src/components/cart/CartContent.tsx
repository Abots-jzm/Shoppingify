import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import CartCategory from "./CartCategory";
import CartItem from "./CartItem";

function CartContent() {
	const { listName, items } = useAppSelector((state) => state.cart);

	return (
		<Container>
			<Title>{listName}</Title>
			<Categories>
				{items.map(({ name, items }, i) => (
					<CartCategory title={name} key={i}>
						{items.map(({ name, amount }, j) => (
							<CartItem name={name} amount={amount} key={j} />
						))}
					</CartCategory>
				))}
			</Categories>
		</Container>
	);
}

export default CartContent;

const Categories = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5.1rem;
`;

const Title = styled.div`
	color: #34333a;
	font-size: 2.4rem;
	font-weight: 700;
	margin-bottom: 3.9rem;
`;

const Container = styled.div`
	flex: 1;
	margin-top: 4.4rem;
	overflow-y: auto;
	padding: 0 1.5rem;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 100rem;
	}

	&::-webkit-scrollbar-thumb {
		height: 1rem;
		background: #444;
		border-radius: 100rem;
	}

	@media only screen and (max-width: 600px) {
		margin-top: 3.2rem;
	}
`;
