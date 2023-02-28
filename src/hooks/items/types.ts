export enum itemsQueryKeys {
	DEFAULT = "default items",
	ADDED_ITEMS = "added items",
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
};
