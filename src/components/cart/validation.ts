import { AddNewItemType } from "./types";
import * as Yup from "yup";

export const addNewItemsInitialValues: AddNewItemType = {
	name: "",
	note: "",
	image: "",
	category: null,
};

export const addNewItemValidationSchema = Yup.object().shape({
	name: Yup.string().required("Please enter a name for the new item"),
	note: Yup.string(),
	image: Yup.string().test("valid-image-url", "Please input a valid image url", (value?: string) => {
		if (!value) return true; //false = error

		return testImage(value, 1000).then((status) => status === "success");
	}),
	category: Yup.mixed().required("Please select a category for the new item"),
});

const testImage = (url: string, timeout?: number) =>
	new Promise((res) => {
		timeout = timeout || 5000;
		let timedOut = false;
		let timer: any;
		const img = new Image();

		img.onerror = img.onabort = function () {
			if (!timedOut) {
				clearTimeout(timer);
				res("error");
			}
		};

		img.onload = function () {
			if (!timedOut) {
				clearTimeout(timer);
				res("success");
			}
		};

		img.src = url;

		timer = setTimeout(function () {
			timedOut = true;
			// reset .src to invalid URL so it stops previous loading, but doesn't trigger new load
			img.src = "//!!!!/test.jpg";
			res("timeout");
		}, timeout);
	});
