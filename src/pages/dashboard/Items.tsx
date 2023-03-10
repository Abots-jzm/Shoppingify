import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Category from "../../components/items/Category";
import Item from "../../components/items/Item";
import MobileCategory from "../../components/items/MobileCategory";
import useGetDefaultItems from "../../hooks/items/useGetDefualtItems";
import useGetUserItems from "../../hooks/items/useGetUserItems";
import useScreenSize from "../../hooks/useScreenSize";
import { Categories } from "../../store/slices/types";

function Items() {
	const { data: defaultItems, isLoading, isError } = useGetDefaultItems();
	const { data: userItems } = useGetUserItems();
	const { screenWidth } = useScreenSize();

	const typedDefaultItems = defaultItems?.categories as Categories[];

	const data: Categories[] = useMemo(() => {
		userItems?.forEach((item, i) => {
			const categoryOfInterest = typedDefaultItems.find((categtory) => categtory.name === item.category);
			if (categoryOfInterest)
				categoryOfInterest.items.push({ name: item.name, id: item.id, image: item.image, note: item.note });
			else
				typedDefaultItems.push({
					name: item.category,
					id: i.toString(),
					items: [{ name: item.name, id: item.id, image: item.image, note: item.note }],
				});
		});
		return typedDefaultItems;
	}, [userItems, typedDefaultItems]);

	if (isLoading)
		return (
			<Container>
				<LoadingContainer>
					<div>
						<LoadingSpinner>
							<div></div>
							<div></div>
							<div></div>
						</LoadingSpinner>
					</div>
				</LoadingContainer>
			</Container>
		);

	if (isError) {
		return (
			<Container>
				<LoadingContainer>
					<div>An unexpected error occured</div>
				</LoadingContainer>
			</Container>
		);
	}

	return (
		<Container>
			<HeaderText>
				<span>Shoppingify</span> allows you to take your shopping list wherever you go
			</HeaderText>
			<ContentContainer>
				{data.map((category) =>
					screenWidth > 600 ? (
						<Category key={category.id} title={category.name}>
							{category.items.map((item) => (
								<Item
									key={item.id}
									id={item.id}
									name={item.name}
									categoryName={category.name}
									categoryId={category.id}
									note={item.note}
									image={item.image}
								/>
							))}
						</Category>
					) : (
						<MobileCategory key={category.id} title={category.name}>
							{category.items.map((item) => (
								<Item
									key={item.id}
									id={item.id}
									name={item.name}
									categoryName={category.name}
									categoryId={category.id}
									note={item.note}
									image={item.image}
								/>
							))}
						</MobileCategory>
					)
				)}
			</ContentContainer>
		</Container>
	);
}

export default Items;

const spinner = keyframes`
	0% {
    top: 8px;
    height: 64px;
  }

  50%, 100% {
    top: 24px;
    height: 32px;
  }`;

const LoadingSpinner = styled.div`
	display: inline-block;
	position: relative;
	width: 8rem;
	height: 8rem;

	div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		background: rgba(0, 0, 0, 0.2);
		animation: ${spinner} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
		border-radius: 3px;
	}

	div:nth-child(1) {
		left: 0.8rem;
		animation-delay: -0.24s;
	}

	div:nth-child(2) {
		left: 3.2rem;
		animation-delay: -0.12s;
	}

	div:nth-child(3) {
		left: 5.6rem;
		animation-delay: 0;
	}
`;

const LoadingContainer = styled.div`
	display: grid;
	place-items: center;
	height: 100%;
`;

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
