import React from "react";
import styled from "styled-components";

function EmptyCart() {
	return (
		<Container>
			<Text>No items</Text>
		</Container>
	);
}

export default EmptyCart;

const Container = styled.div`
	padding-top: 20vh;
`;

const Text = styled.div`
	text-align: center;
	font-weight: 700;
	color: #34333a;
`;
