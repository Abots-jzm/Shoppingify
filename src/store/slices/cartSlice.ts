import { createSlice } from "@reduxjs/toolkit";

type ItemType = {
	name: string;
	amount: number;
};

type Categories = {
	name: string;
	items: ItemType[];
};

type InitialState = {
	cartIsOpen: boolean;
	listName: string;
	items: Categories[];
};

const initialState: InitialState = {
	cartIsOpen: false,
	listName: "Shopping list",
	items: [
		{
			name: "Testing",
			items: [
				{ name: "Ayooooooo looooooooo", amount: 3 },
				{ name: "Goodies", amount: 3 },
			],
		},
		{
			name: "Testing 2",
			items: [
				{ name: "Goodies", amount: 3 },
				{ name: "Goodies", amount: 3 },
				{ name: "Goodies", amount: 3 },
				{ name: "Goodies", amount: 3 },
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
