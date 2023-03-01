import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import sourceSVG from "../../assets/source.svg";
import EmptyCart from "./EmptyCart";
import CartBottom from "./CartBottom";
import CartController from "./CartController";
import CartContent from "./CartContent";
import NewItemForm from "./NewItemForm";
import { Formik, Form } from "formik";
import { AddNewItemType } from "./types";
import { addNewItemsInitialValues, addNewItemValidationSchema } from "./validation";
import useAddNewItem from "../../hooks/items/useAddNewItem";
import { cartActions } from "../../store/slices/cartSlice";
import ItemDetails from "./ItemDetails";
import { MdEdit } from "react-icons/md";
import useSaveList from "../../hooks/items/useSaveList";
import { Timestamp } from "firebase/firestore";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";

function ShoppingCart() {
	const { listName, items, isAddingNewItem, isCheckingItemDetails, listMode } = useAppSelector((state) => state.cart);
	const { addedItemsCount, currentItem } = useAppSelector((state) => state.app);
	const userId = useAppSelector((state) => state.auth.uid);
	const cartIsEmpty = items.length === 0;
	const dispatch = useAppDispatch();

	const { mutate: addItem, isLoading: addNewItemIsLoading, isError: addNewItemError } = useAddNewItem();
	const { mutate: saveList, isLoading: IsSavingList, isError: saveListError } = useSaveList();

	const [modalIsOpen, setModalIsOpen] = useState(false);

	function addNewItem(values: AddNewItemType) {
		if (!userId) return;

		addItem(
			{
				userId,
				data: {
					id: userId + "-" + addedItemsCount,
					name: values.name,
					note: values.note,
					image: values.image,
					category: values.category?.label || "Others",
				},
			},
			{
				onSuccess() {
					dispatch(cartActions.setIsAddingNewItem(false));
				},
			}
		);
	}

	function addToList() {
		if (!currentItem) return;

		const { name, category, categoryId, id } = currentItem;
		dispatch(cartActions.addToCart({ categoryId, id, name, categoryName: category }));
		dispatch(cartActions.setIsCheckingItemDetails(false));
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	function completeList() {
		if (!userId) return;

		saveList(
			{
				userId,
				data: { date: Timestamp.fromDate(new Date()), name: listName, state: "completed", list: items },
			},
			{
				onSuccess() {
					dispatch(cartActions.clearList());
				},
			}
		);
	}

	function cancelList() {
		if (!userId) return;

		saveList(
			{
				userId,
				data: { date: Timestamp.fromDate(new Date()), name: listName, state: "cancelled", list: items },
			},
			{
				onSuccess() {
					dispatch(cartActions.clearList());
					closeModal();
				},
			}
		);
	}

	if (isCheckingItemDetails)
		return (
			<CartController color="#FAFAFE">
				<CartBody>
					<ItemDetails />
					<CartBottom
						mode="two buttons"
						outlineBtnText="cancel"
						FilledBtnText="Add to list"
						color="#FAFAFE"
						onFilledBtnClicked={addToList}
						onOutlineBtnClicked={() => dispatch(cartActions.setIsCheckingItemDetails(false))}
						hideFilled={listMode === "active"}
					/>
				</CartBody>
			</CartController>
		);

	if (isAddingNewItem)
		return (
			<CartController color="#FAFAFE">
				<CartBody>
					<Formik
						initialValues={addNewItemsInitialValues}
						onSubmit={addNewItem}
						validationSchema={addNewItemValidationSchema}
					>
						<Form>
							<NewItemForm />
							<CartBottom
								mode="two buttons"
								outlineBtnText="cancel"
								FilledBtnText="Save"
								isLoading={addNewItemIsLoading}
								isError={addNewItemError}
								color="#FAFAFE"
								onOutlineBtnClicked={() => dispatch(cartActions.setIsAddingNewItem(false))}
							/>
						</Form>
					</Formik>
				</CartBody>
			</CartController>
		);

	return (
		<CartController color="#fff0de">
			<CartBody>
				<Padded>
					<AddNewItem>
						<div className="img">
							<img src={sourceSVG} alt="source" />
						</div>
						<div className="right">
							<div>Didn't find what you need?</div>
							<button onClick={() => dispatch(cartActions.setIsAddingNewItem(true))}>Add item</button>
						</div>
					</AddNewItem>
					<Title>
						<div>{listName}</div>
						{listMode === "active" && (
							<button className="edit" onClick={() => dispatch(cartActions.setListMode("edit"))}>
								<MdEdit />
							</button>
						)}
					</Title>
					{cartIsEmpty && <EmptyCart />}
					{!cartIsEmpty && <CartContent />}
				</Padded>
				{listMode === "edit" && <CartBottom mode={"normal"} />}
				{listMode === "active" && (
					<CartBottom
						mode="two buttons"
						outlineBtnText="cancel"
						FilledBtnText="Complete"
						FilledBtnColor="#56CCF2"
						isLoading={IsSavingList && !modalIsOpen}
						isError={saveListError}
						color="white"
						onOutlineBtnClicked={() => setModalIsOpen(true)}
						onFilledBtnClicked={completeList}
					/>
				)}
			</CartBody>
			<AnimatePresence>
				{modalIsOpen && (
					<Modal closeModal={closeModal} onFilledButtonClicked={cancelList} isLoading={IsSavingList}>
						Are you sure you want to cancel this list?
					</Modal>
				)}
			</AnimatePresence>
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
	display: flex;
	justify-content: space-between;
	align-items: center;

	.edit {
		cursor: pointer;
		background-color: inherit;
		color: inherit;
	}

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
			transition: 0.3s;

			&:hover {
				background-color: #ddd;
			}
		}
	}

	@media only screen and (max-width: 600px) {
		.img {
			left: 3rem;
			top: 0.7rem;
		}
	}
`;
