import React from "react";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";
import { useAppDispatch } from "../../store/hooks";
import { cartActions } from "../../store/slices/cartSlice";
import { appActions } from "../../store/slices/appSlice";

type Props = {
	name: string;
	id: string;
	categoryName: string;
	categoryId: string;
	image?: string;
	note?: string;
};

function Item({ name, id, categoryName, categoryId, image, note }: Props) {
	const dispatch = useAppDispatch();

	function handleAddToCart(e: React.MouseEvent) {
		e.stopPropagation();
		dispatch(cartActions.addToCart({ categoryId, categoryName, id, name }));
		dispatch(cartActions.setIsAddingNewItem(false));
		dispatch(cartActions.setIsCheckingItemDetails(false));
	}

	function showItemDetails() {
		dispatch(cartActions.setIsCheckingItemDetails(true));
		dispatch(cartActions.toggleCart());
		dispatch(appActions.updateCurrentItem({ name, image, note, category: categoryName }));
	}

	return (
		<Container onClick={showItemDetails}>
			<Name>{name}</Name>
			<Icon onClick={handleAddToCart}>
				<GoPlus />
			</Icon>
		</Container>
	);
}

export default Item;

const Name = styled.button`
	background-color: white;
	padding: 1.6rem;
	padding-right: 0;
	display: grid;
	place-items: center;
	text-align: left;
	outline: none;
`;

const Icon = styled.button`
	color: #c1c1c4;
	text-align: right;
	flex-shrink: 0;
	background-color: inherit;
	padding: 1.6rem;
	padding-left: 0;
	display: grid;
	place-items: center;
	outline: none;
`;

const Container = styled.div`
	background-color: white;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
	border-radius: 1.2rem;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	transition: transform 0.15s;
	cursor: pointer;

	&:active {
		transform: scale(1.05);
	}
`;
