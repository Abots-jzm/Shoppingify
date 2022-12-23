import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
	cartIsOpen: boolean;
};

const initialState: InitialState = {
	cartIsOpen: false,
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
