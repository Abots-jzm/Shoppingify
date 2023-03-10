type ItemType = {
	name: string;
	id: string;
	image?: string;
	note?: string;
};

type CartItemType = {
	name: string;
	amount: number;
	id: string;
	completed: boolean;
};

export type ItemDisplayType = {
	name: string;
	id: string;
	category: string;
	categoryId: string;
	image?: string;
	note?: string;
};

export type Categories = {
	name: string;
	items: ItemType[];
	id: string;
};

export type CartCategories = {
	name: string;
	items: CartItemType[];
	id: string;
};

export type CartInitialState = {
	cartIsOpen: boolean;
	listName: string;
	items: CartCategories[];
	itemsCount: number;
	isAddingNewItem: boolean;
	isCheckingItemDetails: boolean;
	listMode: "active" | "edit";
};

export type AddToCartPayload = {
	name: string;
	id: string;
	categoryName: string;
	categoryId: string;
};

export type IncreaseOrDecreasePayload = {
	categoryId: string;
	itemId: string;
};

export type AppInitialState = {
	availableCategories: string[];
	addedItemsCount: number;
	currentItem: ItemDisplayType | null;
};
