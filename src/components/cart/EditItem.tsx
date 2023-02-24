import React, { useEffect } from "react";
import styled from "styled-components";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { motion, useAnimationControls } from "framer-motion";
import { DeleteBtnVariants, RevealVariants } from "./variants";
import { useAppDispatch } from "../../store/hooks";
import { cartActions } from "../../store/slices/cartSlice";

type Props = {
	amount: number;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	itemId: string;
	categoryId: string;
};

function EditItem({ amount, setIsEditing, itemId, categoryId }: Props) {
	const dispatch = useAppDispatch();
	const amountControls = useAnimationControls();

	useEffect(() => {
		if (!amount) return

		amountControls.start({scaleX: 1.1,  transition: {duration: 0.1,}})
		.then(() => amountControls.start({scaleX: 1, transition: { duration: 0.1 }}));
	}, [amount])

	return (
		<Container initial="hidden" animate="visible" exit="hidden" variants={RevealVariants}>
			<Delete variants={DeleteBtnVariants} onClick={() => dispatch(cartActions.removeFromCart({ itemId, categoryId }))}>
				<MdOutlineDeleteOutline />
			</Delete>
			<Edit>
				<button className="icon" onClick={() => dispatch(cartActions.decreaseAmount({ itemId, categoryId }))}>
					<AiOutlineMinus />
				</button>
				<Amount onClick={() => setIsEditing(false)} animate={amountControls}>
					<span>{amount}</span> pcs
				</Amount>
				<button className="icon" onClick={() => dispatch(cartActions.increaseAmount({ itemId, categoryId }))}>
					<AiOutlinePlus />
				</button>
			</Edit>
		</Container>
	);
}

export default EditItem;

const Amount = styled(motion.div)`
	border: 2px solid #f9a109;
	color: #f9a109;
	font-size: 1.2rem;
	padding: 0.8rem 1.9rem;
	border-radius: 100rem;
	cursor: pointer;
	flex-shrink: 0;
	user-select: none;

	span {
		font-weight: 700;
	}
`;

const Edit = styled.div`
	padding: 0 1.1rem;
	align-self: center;
	display: flex;
	gap: 0.9rem;
	font-size: 2rem;
	color: #f9a109;
	align-items: center;
	flex-shrink: 0;

	button.icon {
		display: grid;
		place-items: center;
		cursor: pointer;
		color: inherit;
		background-color: inherit;
	}
`;

const Delete = styled(motion.div)`
	color: white;
	background-color: #f9a109;
	border-radius: 12px;
	padding: 1.4rem 1rem;
	display: grid;
	place-items: center;
	cursor: pointer;
`;

const Container = styled(motion.div)`
	position: absolute;
	background-color: white;
	right: 0;
	border-radius: 12px;
	display: flex;
	overflow: hidden;
	justify-content: flex-end;
`;
