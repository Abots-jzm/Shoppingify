import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
	title: string;
	children: ReactNode;
};

function CartCategory({ title, children }: Props) {
	return (
		<div>
			<Title>{title}</Title>
			<Children>{children}</Children>
		</div>
	);
}

export default CartCategory;

const Title = styled.div`
	margin-bottom: 2.5rem;
	font-size: 1.4rem;
	color: #828282;
`;

const Children = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;
