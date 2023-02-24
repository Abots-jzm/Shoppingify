import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import EditItem from "./EditItem";

type Props = {
	name: string;
	amount: number;
	id: string;
	categoryId: string;
};

function CartItem({ name, amount, id, categoryId }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const amountControls = useAnimationControls();

	useEffect(() => {
		if (!amount || isEditing) return

		amountControls.start({scaleX: 1.1,  transition: {duration: 0.1,}})
		.then(() => amountControls.start({scaleX: 1, transition: { duration: 0.1 }}));
	}, [amount])

	return (
		<Container>
			<Name>{name}</Name>
			<Amount onClick={() => setIsEditing(true)} animate={amountControls}>
				<span>{amount}</span> pcs
			</Amount>
			<AnimatePresence>
				{isEditing && (
					<EditItem key="edit" amount={amount} setIsEditing={setIsEditing} itemId={id} categoryId={categoryId} />
				)}
			</AnimatePresence>
		</Container>
	);
}

export default CartItem;

const Amount = styled(motion.div)`
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
