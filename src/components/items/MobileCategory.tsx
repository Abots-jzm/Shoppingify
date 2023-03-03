import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { AccordionVariants } from "../variants";

type Props = {
	children?: ReactNode;
	title: string;
};

function MobileCategory({ children, title }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Container isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
			<Title>
				<div>{title}</div>
				<Icon isOpen={isOpen}>
					<IoIosArrowDown />
				</Icon>
			</Title>
			<AnimatePresence initial={false}>
				{isOpen && (
					<Grid
						initial="collapsed"
						animate="open"
						exit="collapsed"
						transition={{ duration: 0.2 }}
						variants={AccordionVariants}
					>
						{children}
					</Grid>
				)}
			</AnimatePresence>
		</Container>
	);
}

export default MobileCategory;

interface IIcon {
	isOpen: boolean;
}

const Icon = styled.div<IIcon>`
	transition: all 0.2s;
	transform-origin: center;
	transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
`;

const Grid = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	row-gap: 2.7rem;
	column-gap: 1.9rem;
	align-items: flex-start;
`;

const Title = styled.div`
	font-size: 1.8rem;
	margin-bottom: 1.8rem;
	display: flex;
	justify-content: space-between;
`;

interface IContainer {
	isOpen: boolean;
}

const Container = styled.div<IContainer>`
	cursor: pointer;
	margin-bottom: ${(props) => (props.isOpen ? "4.5rem" : "3rem")};
`;
