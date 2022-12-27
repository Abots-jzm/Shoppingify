import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	amount: number;
};

function CartItem({ name, amount }: Props) {
	return (
		<Container>
			<Name>{name}</Name>
			<Amount>{amount} pcs</Amount>
		</Container>
	);
}

export default CartItem;

const Amount = styled.div`
	border: 2px solid #f9a109;
	color: #f9a109;
	font-size: 1.2rem;
	padding: 0.8rem 1.9rem;
	border-radius: 100rem;
	cursor: pointer;
`;

const Name = styled.div`
	color: black;
	font-size: 1.8rem;
`;

const Container = styled.div`
	display: flex;
	gap: 8.7rem;
	justify-content: space-between;
	align-items: center;
`;
