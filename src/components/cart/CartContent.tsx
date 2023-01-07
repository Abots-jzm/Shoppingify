import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import CartCategory from "./CartCategory";
import CartItem from "./CartItem";

function CartContent() {
	const items = useAppSelector((state) => state.cart.items);

	return (
		<Container>
			<Categories>
				{items.map(({ name, items, id }) => (
					<CartCategory title={name} key={id}>
						{items.map(({ name, amount, id }) => (
							<CartItem name={name} amount={amount} key={id} />
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

const Container = styled.div`
	flex: 1;
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
`;
