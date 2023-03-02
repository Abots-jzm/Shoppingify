import { HistoryType } from "./../../hooks/items/types";

export type GroupedHistory = {
	monthName: string;
	items: HistoryType[];
};

export type SortedItem = {
	name: string;
	percent: number;
};

export type GroupedMonths = {
	monthName: string;
	monthIndex: number;
	items: number;
};

export const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
