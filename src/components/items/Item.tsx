import React from "react";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { useAppDispatch } from "../../store/hooks";
import { cartActions } from "../../store/slices/cartSlice";

type Props = {
	name: string;
	id: string;
	categoryName: string;
	categoryId: string;
};

function Item({ name, id, categoryName, categoryId }: Props) {
	const dispatch = useAppDispatch();

	function handleAddToCart() {
		dispatch(cartActions.addToCart({ categoryId, categoryName, id, name }));
	}

	return (
		<Container>
			<div>{name}</div>
			<Icon onClick={handleAddToCart}>
				<GoPlus />
			</Icon>
		</Container>
	);
}

export default Item;

const Icon = styled.button`
	color: #c1c1c4;
	width: 2.1rem;
	text-align: right;
	flex-shrink: 0;
	background-color: inherit;
`;

const Container = styled.div`
	background-color: white;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
	border-radius: 1.2rem;
	padding: 1.6rem;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;
