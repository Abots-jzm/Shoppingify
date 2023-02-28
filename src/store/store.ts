import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import appSlice from "./slices/appSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		cart: cartSlice,
		app: appSlice,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
