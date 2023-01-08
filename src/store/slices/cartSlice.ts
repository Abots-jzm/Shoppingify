import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartPayload, CartInitialState, IncreaseOrDecreasePayload } from "./types";

const initialState: CartInitialState = {
	cartIsOpen: false,
	listName: "Shopping list",
	items: [],
	itemsCount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart(state) {
			state.cartIsOpen = !state.cartIsOpen;
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

			if (categoryOfInterest.items.length === 0) state.items.splice(state.items.indexOf(categoryOfInterest), 1);
		},
		addToCart(state, { payload }: PayloadAction<AddToCartPayload>) {
			const categoryOfInterest = state.items.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) {
				state.items.push({
					name: payload.categoryName,
					id: payload.categoryId,
					items: [{ name: payload.name, id: payload.id, amount: 1 }],
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
			});
			state.itemsCount++;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
