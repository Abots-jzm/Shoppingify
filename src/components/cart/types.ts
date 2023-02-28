export type SelectOption = {
	label: string;
	value: string;
};

export type AddNewItemType = {
	name: string;
	note: string;
	image: string;
	category: SelectOption | null;
};
