import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddToCartPayload, CartInitialState } from "./types";

const initialState: CartInitialState = {
	cartIsOpen: false,
	listName: "Shopping list",
	items: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart(state) {
			state.cartIsOpen = !state.cartIsOpen;
		},
		addToCart({ items: categories }, { payload }: PayloadAction<AddToCartPayload>) {
			const categoryOfInterest = categories.find((category) => category.id === payload.categoryId);
			if (!categoryOfInterest) {
				categories.push({
					name: payload.categoryName,
					id: payload.categoryId,
					items: [{ name: payload.name, id: payload.id, amount: 1 }],
				});
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
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
