import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import useScreenSize from "../hooks/useScreenSize";
import { useAppSelector } from "../store/hooks";

const ContainerVariants: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			when: "beforeChildren",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.1,
			when: "afterChildren",
		},
	},
};

const CartVariants: Variants = {
	hidden: {
		x: "100%",
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
	exit: {
		x: "100%",
		transition: {
			duration: 0.2,
		},
	},
};

function ShoppingCart() {
	const cartIsOpen = useAppSelector((state) => state.cart.cartIsOpen);
	const { screenWidth } = useScreenSize();

	return (
		<AnimatePresence mode="popLayout">
			{(cartIsOpen || screenWidth > 900) && (
				<Container variants={ContainerVariants} initial="hidden" animate="visible" exit="exit">
					<div />
					<motion.div variants={CartVariants}>ShoppingCart</motion.div>
				</Container>
			)}
		</AnimatePresence>
	);
}

export default ShoppingCart;

const Container = styled(motion.div)`
	flex: 0 0 35rem;
	position: sticky;
	top: 0;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);

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

		div:first-child {
			flex: 0 0 9.3rem;
		}

		div:last-child {
			flex: 0 1 35rem;
		}
	}

	@media only screen and (max-width: 600px) {
		div:first-child {
			flex: 0 0 6.2rem;
		}

		div:last-child {
			flex: 0 1 31.5rem;
		}
	}
`;
