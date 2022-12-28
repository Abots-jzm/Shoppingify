import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { CartVariants, ContainerVariants } from "./variants";
import useScreenSize from "../../hooks/useScreenSize";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cartActions } from "../../store/slices/cartSlice";

type Props = {
	children: ReactNode;
};

function CartController({ children }: Props) {
	const cartIsOpen = useAppSelector((state) => state.cart.cartIsOpen);
	const dispatch = useAppDispatch();
	const { screenWidth } = useScreenSize();

	function onOverlayClick() {
		dispatch(cartActions.toggleCart());
	}

	return (
		<AnimatePresence initial={false}>
			{(cartIsOpen || screenWidth > 900) && (
				<Container
					key="cart"
					variants={ContainerVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					onClick={onOverlayClick}
				>
					<div className="empty" />
					<motion.div variants={CartVariants} className="cart" onClick={(e) => e.stopPropagation()}>
						{children}
					</motion.div>
				</Container>
			)}
		</AnimatePresence>
	);
}

export default CartController;

const Container = styled(motion.div)`
	flex: 0 0 39rem;
	position: sticky;
	top: 0;
	height: 100vh;
	max-height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);

	.empty {
		display: none;
	}

	.cart {
		overflow-y: auto;
		max-height: 100vh;
	}

	& > div {
		background-color: #fff0de;
		width: 100%;
		height: 100%;
	}

	@media only screen and (max-width: 900px) {
		display: flex;
		position: fixed;
		inset: 0;
		justify-content: space-between;

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
