import React, { useMemo } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import styled, { keyframes } from "styled-components";
import StatBar from "../../components/statistics/StatBar";
import useGetHistory from "../../hooks/items/useGetHistory";
import { GroupedMonths, MONTH_NAMES, SortedItem } from "./types";

function Statistics() {
	const { data, isLoading, isError } = useGetHistory();

	const [sortedItems, sortedCategories] = useMemo(() => {
		if (!data) return [];

		let itemsTotal = 0;
		let categoriesTotal = 0;
		const sortedItems: SortedItem[] = [];
		const sortedCategories: SortedItem[] = [];
		data.forEach((history) => {
			history.list.forEach((category) => {
				categoriesTotal++;
				const index = sortedCategories.findIndex((sortedItem) => sortedItem.name === category.name);
				if (index >= 0) sortedCategories[index].percent++;
				else sortedCategories.push({ name: category.name, percent: 1 });

				category.items.forEach((item) => {
					itemsTotal += item.amount;
					const index = sortedItems.findIndex((sortedItem) => sortedItem.name === item.name);
					if (index >= 0) sortedItems[index].percent += item.amount;
					else sortedItems.push({ name: item.name, percent: item.amount });
				});
			});
		});

		sortedItems.forEach((sortedItem) => {
			sortedItem.percent = +((sortedItem.percent / itemsTotal) * 100).toFixed(0);
		});
		sortedItems.sort((a, b) => b.percent - a.percent);

		sortedCategories.forEach((sortedItem) => {
			sortedItem.percent = +((sortedItem.percent / categoriesTotal) * 100).toFixed(0);
		});
		sortedCategories.sort((a, b) => b.percent - a.percent);
		return [sortedItems.slice(0, 3), sortedCategories.slice(0, 3)];
	}, [data]);

	const groupedMonths = useMemo(() => {
		if (!data) return [];

		const result: GroupedMonths[] = [];

		data.forEach((history) => {
			const index = result.findIndex((group) => group.monthName === MONTH_NAMES[history.date.toDate().getMonth()]);
			if (index >= 0)
				result[index].items += history.list.reduce(
					(total, category) => total + category.items.reduce((total2, item) => total2 + item.amount, 0),
					0
				);
			else
				result.push({
					monthName: MONTH_NAMES[history.date.toDate().getMonth()],
					monthIndex: history.date.toDate().getMonth(),
					items: history.list.reduce(
						(total, category) => total + category.items.reduce((total2, item) => total2 + item.amount, 0),
						0
					),
				});
		});

		return result.sort((a, b) => a.monthIndex - b.monthIndex);
	}, [data]);

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

	if (data.length === 0)
		return (
			<Container>
				<LoadingContainer>
					<div>You haven't completed any lists yet</div>
				</LoadingContainer>
			</Container>
		);

	return (
		<Container>
			<Sections>
				<Section>
					<div className="heading">Top Items</div>
					<div className="stats">
						{sortedItems?.map((item, i) => (
							<StatBar name={item.name} percent={item.percent} type="item" key={i} />
						))}
					</div>
				</Section>
				<Section>
					<div className="heading">Top Categories</div>
					<div className="stats">
						{sortedCategories?.map((item, i) => (
							<StatBar name={item.name} percent={item.percent} type="category" key={i} />
						))}
					</div>
				</Section>
			</Sections>
			<Chart>
				<div className="heading">Monthly Summary</div>
				<ResponsiveContainer width="100%" height={302}>
					<LineChart data={groupedMonths}>
						<Line type="monotone" dataKey="items" stroke="#F9A109" />
						<CartesianGrid stroke="#828282" strokeDasharray={3} />
						<XAxis dataKey="monthName" strokeDasharray={3} stroke="#828282" />
						<YAxis strokeDasharray={3} stroke="#828282" />
						<Legend verticalAlign="bottom" />
					</LineChart>
				</ResponsiveContainer>
			</Chart>
		</Container>
	);
}

export default Statistics;

const Chart = styled.div`
	.heading {
		margin-bottom: 4.1rem;
		font-size: 2.4rem;
		color: black;
	}

	@media only screen and (max-width: 600px) {
		.heading {
			margin-bottom: 2.6rem;
		}
	}
`;

const Section = styled.div`
	.heading {
		margin-bottom: 3.8rem;
		font-size: 2.4rem;
		color: black;
	}

	.stats {
		display: flex;
		flex-direction: column;
		gap: 2.9rem;
	}

	@media only screen and (max-width: 600px) {
		.heading {
			margin-bottom: 2.8rem;
		}
	}
`;

const Sections = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
	column-gap: 5vw;
	row-gap: 4rem;
	margin-top: 2rem;
	margin-bottom: 6.5rem;

	@media only screen and (max-width: 600px) {
		margin-bottom: 3.3rem;
	}
`;

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

const Container = styled.div`
	background-color: #fafafe;
	padding: 3.4rem 6vw;
	flex: 1;

	@media only screen and (max-width: 600px) {
		padding: 2rem 1.2rem;
	}
`;
