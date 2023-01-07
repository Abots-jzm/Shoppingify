import React, { ReactNode } from "react";
import styled from "styled-components";
import { GoPlus } from "react-icons/go";

type Props = {
	children: ReactNode;
};

function Item({ children }: Props) {
	return (
		<Container>
			<div>{children}</div>
			<Icon>
				<GoPlus />
			</Icon>
		</Container>
	);
}

export default Item;

const Icon = styled.div`
	color: #c1c1c4;
	width: 2.1rem;
	text-align: right;
	flex-shrink: 0;
`;

const Container = styled.div`
	background-color: white;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
	border-radius: 1.2rem;
	padding: 1.6rem;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	cursor: pointer;
`;
