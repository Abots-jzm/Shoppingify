import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import EditItem from "./EditItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FiCheck } from "react-icons/fi";
import { cartActions } from "../../store/slices/cartSlice";

type Props = {
	name: string;
	amount: number;
	id: string;
	categoryId: string;
	completed: boolean;
};

function CartItem({ name, amount, id, categoryId, completed }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const amountControls = useAnimationControls();
	const listMode = useAppSelector((state) => state.cart.listMode);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!amount || isEditing) return;

		amountControls
			.start({ scaleX: 1.1, transition: { duration: 0.1 } })
			.then(() => amountControls.start({ scaleX: 1, transition: { duration: 0.1 } }));
	}, [amount]);

	function completeItem() {
		dispatch(cartActions.toggleItemCompleted({ categoryId, itemId: id }));
	}

	function editItem() {
		if (listMode === "active") return;

		setIsEditing(true);
	}

	return (
		<Container onClick={completeItem} isActive={listMode === "active"}>
			{listMode === "active" && <CheckBox>{completed && <FiCheck />}</CheckBox>}
			<ContentWrapper>
				<Name completed={completed && listMode === "active"}>{name}</Name>
				<Amount onClick={editItem} animate={amountControls}>
					<span>{amount}</span> pcs
				</Amount>
				<AnimatePresence>
					{isEditing && (
						<EditItem key="edit" amount={amount} setIsEditing={setIsEditing} itemId={id} categoryId={categoryId} />
					)}
				</AnimatePresence>
			</ContentWrapper>
		</Container>
	);
}

export default CartItem;

interface IContainer {
	isActive: boolean;
}

const Container = styled.div<IContainer>`
	display: flex;
	align-items: center;
	cursor: ${(props) => (props.isActive ? "pointer" : "default")};
`;

const CheckBox = styled.div`
	margin-right: 1.6rem;
	width: 2.4rem;
	height: 2.4rem;
	border: 2px solid #f9a109;
	color: #f9a109;
	border-radius: 4px;
	font-size: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

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

interface IName {
	completed: boolean;
}

const Name = styled.div<IName>`
	color: black;
	font-size: 1.8rem;

	${(props) => (props.completed ? "text-decoration: line-through;" : "")}
`;

const ContentWrapper = styled.div`
	display: flex;
	gap: 0.9rem;
	justify-content: space-between;
	align-items: center;
	position: relative;
	flex: 1;
`;
