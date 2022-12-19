import React from "react";
import styled from "styled-components";
import logoSVG from "../assets/logo.svg";
import { FiList } from "react-icons/fi";
import { TbHistory } from "react-icons/tb";
import { BiBarChartSquare } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../App";

function SideBar() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Container>
			<div>
				<img src={logoSVG} alt="logo" />
			</div>
			<Tabs>
				<div onClick={() => navigate(paths.ITEMS)}>
					{location.pathname === paths.ITEMS ? <ActiveBar layoutId="active" /> : <Bar />}
					<FiList />
				</div>
				<div onClick={() => navigate(paths.HISTORY)}>
					{location.pathname === paths.HISTORY ? <ActiveBar layoutId="active" /> : <Bar />}
					<TbHistory />
				</div>
				<div onClick={() => navigate(paths.STATISTICS)}>
					{location.pathname === paths.STATISTICS ? <ActiveBar layoutId="active" /> : <Bar />}
					<BiBarChartSquare />
				</div>
			</Tabs>
			<CartBtn>
				<HiOutlineShoppingCart />
			</CartBtn>
		</Container>
	);
}

export default SideBar;

const Bar = styled(motion.div)`
	background-color: transparent;
	align-self: stretch;
	width: 0.6rem;
`;

const ActiveBar = styled(Bar)`
	background-color: #f9a109;
	border-radius: 0px 4px 4px 0px;
`;

const CartBtn = styled.div`
	background-color: #f9a109;
	color: white;
	display: grid;
	place-items: center;
	width: 4.2rem;
	height: 4.2rem;
	border-radius: 50%;
	font-size: 2.2rem;
`;

const Tabs = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 3rem;
	color: #454545;
	font-size: 2.4rem;
	font-weight: 700;
	align-self: stretch;

	& > div {
		height: 4.6rem;
		display: flex;
		align-items: center;
		gap: 2.7rem;
		cursor: pointer;

		@media only screen and (max-width: 600px) {
			gap: 1.5rem;
		}
	}
`;

const Container = styled.div`
	flex-basis: 9.3rem;
	height: 100vh;
	position: sticky;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 3.4rem 0;

	@media only screen and (max-width: 600px) {
		flex-basis: 6.2rem;
		padding: 2rem 0;
	}
`;
