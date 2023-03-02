import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import HistoryDetail from "../../components/history/HistoryDetail";
import HistoryItem from "../../components/history/ListHistory";
import { HistoryType } from "../../hooks/items/types";
import useGetHistory from "../../hooks/items/useGetHistory";
import { GroupedHistory, MONTH_NAMES } from "./types";

function History() {
	const { data, isLoading, isError } = useGetHistory();
	const [detailsShown, setDetailsShown] = useState(false);
	const [currentList, setCurrentList] = useState<HistoryType>();

	const groupedData = useMemo(() => {
		if (!data) return null;

		const result: GroupedHistory[] = [];

		data.forEach((history) => {
			const index = result.findIndex(
				(group) =>
					group.monthName === MONTH_NAMES[history.date.toDate().getMonth()] + " " + history.date.toDate().getFullYear()
			);
			if (index >= 0) result[index].items.push(history);
			else
				result.push({
					monthName: MONTH_NAMES[history.date.toDate().getMonth()] + " " + history.date.toDate().getFullYear(),
					items: [history],
				});
		});

		return result;
	}, [data]);

	function showDetails(currentList: HistoryType) {
		setCurrentList(currentList);
		setDetailsShown(true);
	}

	function hideDetails() {
		setDetailsShown(false);
	}

	if (detailsShown)
		return (
			<Container>
				<HistoryDetail list={currentList} goBack={hideDetails} />
			</Container>
		);

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
			<h5>Shopping history</h5>
			<Sections>
				{groupedData?.map((group, i) => (
					<Month key={i}>
						<div className="name">{group.monthName}</div>
						<div className="items">
							{group.items.map((item, j) => (
								<HistoryItem
									name={item.name}
									date={item.date}
									list={item}
									status={item.state}
									key={"i" + j}
									showDetails={showDetails}
								/>
							))}
						</div>
					</Month>
				))}
			</Sections>
		</Container>
	);
}

export default History;

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

const Month = styled.div`
	.name {
		color: black;
		font-weight: 500;
		font-size: 1.2rem;
		margin-bottom: 1.8rem;
	}

	.items {
		display: flex;
		flex-direction: column-reverse;
		gap: 2.8rem;
	}
`;

const Sections = styled.div`
	display: flex;
	flex-direction: column-reverse;
	gap: 5.3rem;
	margin-top: 4.1rem;
`;

const Container = styled.div`
	background-color: #fafafe;
	padding: 3.4rem 6vw;
	flex: 1;

	h5 {
		font-weight: 700;
		font-size: 2.4rem;
		color: #34333a;
	}

	@media only screen and (max-width: 600px) {
		padding: 2rem 1.2rem;
	}
`;
