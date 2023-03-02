import { Timestamp } from "firebase/firestore";
import { CartCategories } from "./../../store/slices/types";
export enum itemsQueryKeys {
	DEFAULT = "default items",
	ADDED_ITEMS = "added items",
	HISTORY = "history,",
}

export type AddedItemType = {
	id: string;
	name: string;
	note: string;
	image: string;
	category: string;
};

export type AddNewItemPayload = {
	data: AddedItemType;
	userId: string;
};

export type UserDocument = {
	addedItems: AddedItemType[];
	history: HistoryType[];
};

export type HistoryType = {
	state: "completed" | "cancelled";
	date: Timestamp;
	name: string;
	list: CartCategories[];
};

export type SaveListPayload = {
	userId: string;
	data: HistoryType;
};
