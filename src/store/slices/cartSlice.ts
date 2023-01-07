import { createSlice } from "@reduxjs/toolkit";
import { CartInitialState } from "./types";

const initialState: CartInitialState = {
	cartIsOpen: false,
	listName: "Shopping list",
	items: [
		{
			name: "Testing",
			id: "t",
			items: [
				{ name: "Ayooooooo looooooooo", amount: 3, id: "t-1" },
				{ name: "Goodies", amount: 3, id: "t-2" },
			],
		},
		{
			name: "Testing 2",
			id: "t2",
			items: [
				{ name: "Goodies", amount: 3, id: "t2-1" },
				{ name: "Goodies", amount: 3, id: "t2-2" },
				{ name: "Goodies", amount: 3, id: "t2-3" },
				{ name: "Goodies", amount: 3, id: "t2-4" },
			],
		},
	],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart(state) {
			state.cartIsOpen = !state.cartIsOpen;
		},
	},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
