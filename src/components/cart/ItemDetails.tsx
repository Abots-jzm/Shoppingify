import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import ImagePNG from "../../assets/generic_food-removebg-preview.png";

function ItemDetails() {
	const currentItem = useAppSelector((state) => state.app.currentItem);

	return (
		<Container>
			<ImageContainer>
				{currentItem?.image && <img src={currentItem.image} alt="avocado" />}
				{!currentItem?.image && <img src={ImagePNG} alt="avocado" />}
			</ImageContainer>
			<OtherDetails>
				<div>
					<div className="label">name</div>
					<div className="name">{currentItem?.name}</div>
				</div>
				<div>
					<div className="label">category</div>
					<div>{currentItem?.category}</div>
				</div>
				{currentItem?.note && (
					<div>
						<div className="label">note</div>
						<div>{currentItem?.note}</div>
					</div>
				)}
			</OtherDetails>
		</Container>
	);
}

export default ItemDetails;

const OtherDetails = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3rem;
	font-size: 1.8rem;
	color: black;

	.name {
		font-size: 2.4rem;
	}

	.label {
		color: #c1c1c4;
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
`;

const ImageContainer = styled.div`
	overflow: hidden;
	border-radius: 25px;
	margin-bottom: 4.5rem;
	width: 25rem;
	height: 25rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

const Container = styled.div`
	padding: 3.5rem 4rem;
`;
