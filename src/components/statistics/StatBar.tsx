import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

type Props = {
	name: string;
	percent: number;
	type: "item" | "category";
};

function StatBar({ name, percent, type }: Props) {
	return (
		<Container>
			<div className="top">
				<div className="name">{name}</div>
				<div className="percent">{percent}%</div>
			</div>
			<div className="bottom">
				<Bar initial={{ width: 0 }} animate={{ width: percent + "%" }} type={type} />
			</div>
		</Container>
	);
}

export default StatBar;

interface IBar {
	type: "item" | "category";
}

const Bar = styled(motion.div)<IBar>`
	background-color: ${(props) => (props.type === "item" ? "#F9A109" : "#56CCF2")};
	height: 100%;
	border-radius: 4px;
`;

const Container = styled.div`
	width: 100%;

	.bottom {
		background-color: #e0e0e0;
		overflow: hidden;
		height: 0.6rem;
		border-radius: 4px;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.4rem;

		.name {
			font-size: 1.4rem;
		}

		.percent {
			font-size: 1.8rem;
		}
	}
`;
