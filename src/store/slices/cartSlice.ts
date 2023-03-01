import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "../../util/storage";
import { AddToCartPayload, CartInitialState, IncreaseOrDecreasePayload } from "./types";

const INITIAL_LIST_NAME = "Shopping list";

const initialState: CartInitialState = {
	cartIsOpen: false,
	listName: storage.get("listName") || INITIAL_LIST_NAME,
	items: storage.get("active") || [],
	itemsCount: +storage.get("count") || 0,
	isAddingNewItem: false,
	isCheckingItemDetails: false,
	listMode: storage.get("active") ? "active" : "edit",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart(state) {
			state.cartIsOpen = !state.cartIsOpen;
		},
		toggleItemCompleted(state, { payload }: PayloadAction<IncreaseOrDecreasePayload>) {
			const categoryOfInterest = state.items.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) return;

			const itemOfInterest = categoryOfInterest.items.find((item) => item.id === payload.itemId);
			if (!itemOfInterest) return;

			itemOfInterest.completed = !itemOfInterest.completed;
			storage.set("active", state.items);
		},
		increaseAmount(state, { payload }: PayloadAction<IncreaseOrDecreasePayload>) {
			const categoryOfInterest = state.items.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) return;

			const itemOfInterest = categoryOfInterest.items.find((item) => item.id === payload.itemId);
			if (!itemOfInterest) return;

			itemOfInterest.amount++;
		},
		decreaseAmount(state, { payload }: PayloadAction<IncreaseOrDecreasePayload>) {
			const categoryOfInterest = state.items.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) return;

			const itemOfInterest = categoryOfInterest.items.find((item) => item.id === payload.itemId);
			if (!itemOfInterest || itemOfInterest.amount <= 1) return;

			itemOfInterest.amount--;
		},
		removeFromCart(state, { payload }: PayloadAction<IncreaseOrDecreasePayload>) {
			const categoryOfInterest = state.items.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) return;

			const indexOfInterest = categoryOfInterest.items.findIndex((item) => item.id === payload.itemId);
			if (indexOfInterest < 0) return;

			categoryOfInterest.items.splice(indexOfInterest, 1);
			state.itemsCount--;

			if (categoryOfInterest.items.length === 0) state.items.splice(state.items.indexOf(categoryOfInterest), 1);
		},
		addToCart(state, { payload }: PayloadAction<AddToCartPayload>) {
			const categoryOfInterest = state.items.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) {
				state.items.push({
					name: payload.categoryName,
					id: payload.categoryId,
					items: [{ name: payload.name, id: payload.id, amount: 1, completed: false }],
				});
				state.itemsCount++;
				return;
			}

			const itemOfInterest = categoryOfInterest.items.find((item) => item.id === payload.id);
			if (itemOfInterest) {
				itemOfInterest.amount++;
				return;
			}

			categoryOfInterest.items.push({
				name: payload.name,
				id: payload.id,
				amount: 1,
				completed: false,
			});
			state.itemsCount++;
		},
		setIsAddingNewItem(state, { payload }: PayloadAction<boolean>) {
			state.isAddingNewItem = payload;
		},
		setIsCheckingItemDetails(state, { payload }: PayloadAction<boolean>) {
			state.isCheckingItemDetails = payload;
		},
		setListMode(state, { payload }: PayloadAction<"active" | "edit">) {
			state.listMode = payload;
		},
		saveList(state, { payload }: PayloadAction<string>) {
			storage.set("active", state.items);
			storage.set("listName", payload);
			storage.set("count", state.itemsCount);
			state.listMode = "active";
			state.listName = payload;
		},
		clearList(state) {
			storage.remove("listName");
			storage.remove("active");
			storage.remove("count");
			state.listMode = "edit";
			state.listName = INITIAL_LIST_NAME;
			state.items = [];
			state.itemsCount = 0;
			state.cartIsOpen = false;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
