import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	amount: string;
};

function HistoryItem({ name, amount }: Props) {
	return (
		<Container>
			<Name>{name}</Name>
			<Amount>{amount} pcs</Amount>
		</Container>
	);
}

export default HistoryItem;

const Name = styled.button`
	background-color: white;
	padding: 1.6rem;
	padding-right: 0;
	display: grid;
	place-items: center;
	text-align: left;
	outline: none;
`;

const Amount = styled.button`
	color: #f9a10a;
	text-align: right;
	flex-shrink: 0;
	background-color: inherit;
	padding: 1.6rem;
	font-size: 1.2rem;
	padding-left: 0;
	outline: none;
`;

const Container = styled.div`
	background-color: white;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
	border-radius: 1.2rem;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	overflow: hidden;
	transition: transform 0.15s;
	gap: 1rem;
	cursor: pointer;

	&:active {
		transform: scale(1.05);
	}
`;
