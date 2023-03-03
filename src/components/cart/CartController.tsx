import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { CartVariants, ContainerVariants } from "./variants";
import useScreenSize from "../../hooks/useScreenSize";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cartActions } from "../../store/slices/cartSlice";
import Div100vh from "react-div-100vh";

type Props = {
	color: string;
	children: ReactNode;
};

function CartController({ color, children }: Props) {
	const cartIsOpen = useAppSelector((state) => state.cart.cartIsOpen);
	const dispatch = useAppDispatch();
	const { screenWidth } = useScreenSize();

	function onOverlayClick() {
		dispatch(cartActions.toggleCart());
	}

	return (
		<AnimatePresence initial={false}>
			{(cartIsOpen || screenWidth > 900) && (
				<OuterContainer>
					<Container
						key="cart"
						variants={ContainerVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						onClick={onOverlayClick}
						color={color}
					>
						<div className="empty" />
						<motion.div variants={CartVariants} className="cart" onClick={(e) => e.stopPropagation()}>
							{children}
						</motion.div>
					</Container>
				</OuterContainer>
			)}
		</AnimatePresence>
	);
}

export default CartController;

const OuterContainer = styled(Div100vh)`
	flex: 0 0 39rem;
`;

interface IContainer {
	color: string;
}

const Container = styled(motion.div)<IContainer>`
	position: sticky;
	top: 0;
	height: 100%;
	background-color: #fafafe;

	.empty {
		display: none;
	}

	.cart {
		overflow-y: auto;
	}

	& > div {
		/* background-color: #fff0de; */
		background-color: ${(props) => props.color};
		width: 100%;
		height: 100%;
	}

	@media only screen and (max-width: 900px) {
		display: flex;
		position: fixed;
		inset: 0;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.5);

		.empty {
			display: block;
			flex: 0 0 9.3rem;
		}

		.cart {
			flex: 0 1 35rem;
		}
	}

	@media only screen and (max-width: 600px) {
		.empty {
			flex: 0 0 6.2rem;
		}

		.cart {
			flex: 0 1 31.5rem;
		}
	}
`;
