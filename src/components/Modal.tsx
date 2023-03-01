import { motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styled, { keyframes } from "styled-components";
import { ContainerVariants, OverlayVariants } from "./variants";

type Props = {
	children: React.ReactNode;
	isLoading: boolean;
	closeModal: () => void;
	onFilledButtonClicked: () => void;
};

function Modal({ children, isLoading, closeModal, onFilledButtonClicked }: Props) {
	return createPortal(
		<Overlay onClick={closeModal} variants={OverlayVariants} initial="hidden" animate="visible" exit="hidden">
			<Container onClick={(e) => e.stopPropagation()} variants={ContainerVariants}>
				<CloseIcon onClick={closeModal}>
					<AiOutlineClose />
				</CloseIcon>
				{children}
				<Buttons>
					<button onClick={closeModal}>cancel</button>
					<button className="filled" onClick={onFilledButtonClicked}>
						Yes
						{isLoading && <Spinner />}
					</button>
				</Buttons>
			</Container>
		</Overlay>,
		document.getElementById("overlay")!
	);
}

export default Modal;

const CloseIcon = styled.div`
	position: absolute;
	right: 2rem;
	top: 2rem;
	font-size: 1.8rem;
	color: #828282;
	cursor: pointer;
`;

const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	font-size: 1.6rem;
	gap: 2.5rem;
	margin-top: 2rem;

	button {
		color: #34333a;
		outline: none;
		background-color: inherit;
	}

	button.filled {
		font-weight: 700;
		color: white;
		padding: 2rem 2.4rem;
		border-radius: 12px;
		background-color: #eb5757;
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
`;

const Container = styled(motion.div)`
	background-color: white;
	border-radius: 24px;
	width: min(50.8rem, 80%);
	padding: 3.5rem;
	font-size: 2.4rem;
	color: #34333a;
	position: relative;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.1);
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const spinner = keyframes`
   100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	border-left: 2px solid white;
	animation: ${spinner} 0.7s linear infinite;
`;
