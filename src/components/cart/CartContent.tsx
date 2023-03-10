import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import CartCategory from "./CartCategory";
import CartItem from "./CartItem";

function CartContent() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { items, itemsCount } = useAppSelector((state) => state.cart);

	useEffect(() => {
		if (!containerRef.current) return;

		containerRef.current.scrollTop = containerRef.current.scrollHeight;
	}, [itemsCount]);

	return (
		<Container ref={containerRef}>
			<Categories>
				{items.map((category) => (
					<CartCategory title={category.name} key={category.id}>
						{category.items.map(({ name, amount, id, completed }) => (
							<CartItem id={id} categoryId={category.id} name={name} amount={amount} key={id} completed={completed} />
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
		background: rgba(0, 0, 0, 0.6);
		border-radius: 100rem;
	}
`;
