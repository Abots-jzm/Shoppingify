import React from "react";
import styled from "styled-components";
import { CartCategories } from "../../store/slices/types";
import { MdOutlineEventNote } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import { WEEK_DAYS } from "../../pages/dashboard/types";
import { HistoryType } from "../../hooks/items/types";

type Props = {
	name: string;
	date: Timestamp;
	list: HistoryType;
	status: "completed" | "cancelled";
	showDetails: (currentHistory: HistoryType) => void;
};

function ListHistory({ name, date, list, status, showDetails }: Props) {
	function getDate(date: Timestamp): string {
		const jsDate = date.toDate();
		return (
			WEEK_DAYS[jsDate.getDay()] + " " + jsDate.getDate() + "." + (jsDate.getMonth() + 1) + "." + jsDate.getFullYear()
		);
	}

	return (
		<Container onClick={() => showDetails(list)}>
			<Name>{name}</Name>
			<Date>
				<div className="icon">
					<MdOutlineEventNote />
				</div>
				<div>{getDate(date)}</div>
			</Date>
			<StatusContainer>
				<Status status={status}>{status}</Status>
			</StatusContainer>
			<Right>
				<FaChevronRight />
			</Right>
		</Container>
	);
}

export default ListHistory;

const StatusContainer = styled.div`
	width: 7.6rem;
	display: grid;
	place-items: center;

	@media only screen and (max-width: 600px) {
		display: none;
	}
`;

const Right = styled.div`
	color: #f9a109;
	display: grid;
	place-items: center;
	margin-left: 0.5rem;
`;

interface IStatus {
	status: "completed" | "cancelled";
}

const Status = styled.div<IStatus>`
	padding: 0.4rem 0.7rem;
	font-size: 1.2rem;
	border-radius: 8px;
	border: 1px solid ${(props) => (props.status === "completed" ? "#56ccf2" : "#eb5757")};
	color: ${(props) => (props.status === "completed" ? "#56ccf2" : "#eb5757")};
`;

const Date = styled.div`
	display: flex;
	gap: 1.3rem;
	align-items: center;
	color: #c1c1c4;
	font-size: 1.2rem;

	.icon {
		font-size: 1.8rem;
		display: grid;
		place-items: center;
	}
`;

const Name = styled.div`
	color: black;
	font-size: 1.6rem;
	flex: 1;
`;

const Container = styled.div`
	background: white;
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
	border-radius: 12px;
	padding: 2rem;
	padding-right: 1.6rem;
	display: flex;
	align-items: center;
	gap: 2.7rem;
	cursor: pointer;
`;
