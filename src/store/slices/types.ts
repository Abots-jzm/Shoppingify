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
};