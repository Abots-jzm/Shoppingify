import React from "react";
import styled from "styled-components";
import Category from "../../components/Category";
import Item from "../../components/Item";

function Items() {
	return (
		<Container>
			<HeaderText>
				<span>Shoppingify</span> allows you to take your shopping list wherever you go
			</HeaderText>
			<ContentContainer>
				<Category title="testing">
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
					<Item>ayooo</Item>
				</Category>
				<Category title="ayo">
					<Item>aoadlj</Item>
					<Item>aoadlj</Item>
				</Category>
			</ContentContainer>
		</Container>
	);
}

export default Items;

const ContentContainer = styled.div`
	margin-top: 6rem;

	@media only screen and (max-width: 600px) {
		margin-top: 0.5rem;
	}
`;

const HeaderText = styled.div`
	font-size: 2.6rem;
	color: #34333a;
	max-width: 45rem;

	span {
		color: #f9a109;
		font-weight: 700;
	}

	@media only screen and (max-width: 600px) {
		display: none;
	}
`;

const Container = styled.div`
	background-color: #fafafe;
	padding: 3.4rem 6vw;
	flex: 1;

	@media only screen and (max-width: 600px) {
		padding: 2rem 1.2rem;
	}
`;
