import React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import useScreenSize from "../hooks/useScreenSize";
import { useAppSelector } from "../store/hooks";
import sourceSVG from "../assets/source.svg";

const ContainerVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.1,
			when: "afterChildren",
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.1,
			when: "beforeChildren",
		},
	},
};

const CartVariants: Variants = {
	hidden: {
		x: "100%",
		transition: {
			duration: 0.2,
		},
	},
	visible: {
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
};

function ShoppingCart() {
	const cartIsOpen = useAppSelector((state) => state.cart.cartIsOpen);
	const { screenWidth } = useScreenSize();

	return (
		<AnimatePresence initial={false}>
			{(cartIsOpen || screenWidth > 900) && (
				<Container variants={ContainerVariants} initial="hidden" animate="visible" exit="hidden">
					<div className="empty" />
					<motion.div variants={CartVariants} className="cart">
						<AddNewItem>
							<div className="img">
								<img src={sourceSVG} alt="source" />
							</div>
							<div className="right">
								<div>Didn't find what you need?</div>
								<button>Add item</button>
							</div>
						</AddNewItem>
					</motion.div>
				</Container>
			)}
		</AnimatePresence>
	);
}

export default ShoppingCart;

const AddNewItem = styled.div`
	background-color: #80485b;
	color: white;
	font-weight: 700;
	border-radius: 24px;
	width: 100%;
	display: flex;
	padding: 1.7rem 2rem;
	gap: 3rem;

	.img {
		position: relative;

		img {
			position: relative;
			transform: scale(1.4);
			bottom: 1.4rem;
		}
	}

	.right {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
		align-items: flex-start;

		button {
			background-color: white;
			color: #34333a;
			box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
			border-radius: 12px;
			padding: 1.1rem 2.95rem;
			font-size: 1.4rem;
		}
	}
`;

const Container = styled(motion.div)`
	flex: 0 0 39rem;
	position: sticky;
	top: 0;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);

	.empty {
		display: none;
	}

	.cart {
		overflow-y: auto;
		padding: 4rem 3.5rem;
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
			padding: 2.4rem 1.5rem;
		}
	}
`;
