import React from "react";
import { Timestamp } from "firebase/firestore";
import { MdArrowRightAlt, MdOutlineEventNote } from "react-icons/md";
import styled from "styled-components";
import { HistoryType } from "../../hooks/items/types";
import { WEEK_DAYS } from "../../pages/dashboard/types";
import HistoryItem from "./HistoryItem";
import HistoryCategory from "./HistoryCategory";

type Props = {
	list: HistoryType | undefined;
	goBack: () => void;
};

function HistoryDetail({ list, goBack }: Props) {
	function getDate(date?: Timestamp): string {
		if (!date) return "";

		const jsDate = date.toDate();
		return (
			WEEK_DAYS[jsDate.getDay()] + " " + jsDate.getDate() + "." + (jsDate.getMonth() + 1) + "." + jsDate.getFullYear()
		);
	}

	return (
		<div>
			<Back onClick={goBack}>
				<div className="icon">
					<MdArrowRightAlt />
				</div>
				back
			</Back>
			<Heading>{list?.name}</Heading>
			<Date>
				<div className="icon">
					<MdOutlineEventNote />
				</div>
				<div>{getDate(list?.date)}</div>
			</Date>
			<div>
				{list?.list.map((category) => (
					<HistoryCategory title={category.name} key={category.id}>
						{category.items.map((item) => (
							<HistoryItem name={item.name} amount={item.amount.toString()} key={item.id} />
						))}
					</HistoryCategory>
				))}
			</div>
		</div>
	);
}

export default HistoryDetail;

const Date = styled.div`
	display: flex;
	gap: 1.3rem;
	align-items: center;
	color: #c1c1c4;
	font-size: 1.2rem;
	margin-bottom: 5.2rem;

	.icon {
		font-size: 1.8rem;
		display: grid;
		place-items: center;
	}
`;

const Heading = styled.h5`
	font-weight: 700;
	font-size: 2.6rem;
	color: #34333a;
	margin-bottom: 2.1rem;
`;

const Back = styled.div`
	color: #f9a109;
	font-size: 1.4rem;
	display: flex;
	align-items: center;
	margin-bottom: 3.5rem;
	cursor: pointer;

	.icon {
		display: grid;
		place-items: center;
		transform: scaleX(-1);
		font-size: 2rem;
	}
`;
