type ItemType = {
	name: string;
	id: string;
};

type CartItemType = {
	name: string;
	amount: number;
	id: string;
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
