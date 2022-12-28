export const truncateTxt = (value: string, length: number) => {
	return value.length > length ? `${value.substring(0, length)}...` : value;
};
