import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import sourceSVG from "../../assets/source.svg";
import EmptyCart from "./EmptyCart";
import CartBottom from "./CartBottom";
import CartController from "./CartController";
import CartContent from "./CartContent";

function ShoppingCart() {
	const { listName, items } = useAppSelector((state) => state.cart);
	const cartIsEmpty = items.length === 0;

	return (
		<CartController>
			<CartBody>
				<Padded>
					<AddNewItem>
						<div className="img">
							<img src={sourceSVG} alt="source" />
						</div>
						<div className="right">
							<div>Didn't find what you need?</div>
							<button>Add item</button>
						</div>
					</AddNewItem>
					<Title>{listName}</Title>
					{cartIsEmpty && <EmptyCart />}
					{!cartIsEmpty && <CartContent />}
				</Padded>
				<CartBottom mode={"normal"} />
			</CartBody>
		</CartController>
	);
}

export default ShoppingCart;

const Title = styled.div`
	color: #34333a;
	font-size: 2.4rem;
	font-weight: 700;
	margin-top: 4.4rem;
	margin-bottom: 3.9rem;
	padding: 0 1.5rem;

	@media only screen and (max-width: 600px) {
		margin-top: 3.2rem;
	}
`;

const Padded = styled.div`
	padding: 4rem 3.5rem;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	@media only screen and (max-width: 600px) {
		padding: 2.4rem 1.5rem;
	}
`;

const CartBody = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const AddNewItem = styled.div`
	background-color: #80485b;
	color: white;
	font-weight: 700;
	border-radius: 24px;
	width: 100%;
	display: flex;
	padding: 1.7rem 2rem;
	padding-left: 12rem;
	gap: 3rem;

	.img {
		position: absolute;
		left: 4.5rem;
		top: 2.2rem;
	}

	.right {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
		align-items: flex-start;

		button {
			background-color: white;
			color: #34333a;
			box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
			border-radius: 12px;
			padding: 1.1rem 2.95rem;
			font-size: 1.4rem;
		}
	}

	@media only screen and (max-width: 600px) {
		.img {
			left: 3rem;
			top: 0.7rem;
		}
	}
`;
