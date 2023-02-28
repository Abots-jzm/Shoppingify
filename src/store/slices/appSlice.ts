import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppInitialState } from "./types";

const initialState: AppInitialState = {
	availableCategories: [],
	addedItemsCount: 0,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		addToAvailableCategories(state, { payload }: PayloadAction<string[]>) {
			const newAvailableCategories = new Set(state.availableCategories.concat(payload));
			state.availableCategories = Array.from(newAvailableCategories);
		},
		setAddedItemsCount(state, { payload }: PayloadAction<number>) {
			state.addedItemsCount = payload;
		},
	},
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
