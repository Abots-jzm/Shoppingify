import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { truncateTxt } from "../../util";
import EditItem from "./EditItem";

type Props = {
	name: string;
	amount: number;
};

function CartItem({ name, amount }: Props) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Container>
			<Name>{name}</Name>
			<Amount onClick={() => setIsEditing(true)}>
				<span>{amount}</span> pcs
			</Amount>
			<AnimatePresence>
				{isEditing && <EditItem key="edit" amount={amount} setIsEditing={setIsEditing} />}
			</AnimatePresence>
		</Container>
	);
}

export default CartItem;

const Amount = styled.div`
	border: 2px solid #f9a109;
	color: #f9a109;
	font-size: 1.2rem;
	padding: 0.8rem 1.9rem;
	border-radius: 100rem;
	cursor: pointer;
	flex-shrink: 0;

	span {
		font-weight: 700;
	}
`;

const Name = styled.div`
	color: black;
	font-size: 1.8rem;
`;

const Container = styled.div`
	display: flex;
	gap: 0.9rem;
	justify-content: space-between;
	align-items: center;
	position: relative;
`;
