import { appActions } from "./../../store/slices/appSlice";
import { useAppDispatch } from "./../../store/hooks";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase/index";
import { itemsQueryKeys } from "./types";
import { Categories } from "../../store/slices/types";

async function getDefualtItems() {
	return await getDoc(doc(db, "master/default items"));
}

const useGetDefaultItems = () => {
	const dispatch = useAppDispatch();

	return useQuery([itemsQueryKeys.DEFAULT], getDefualtItems, {
		select(data) {
			return data.data();
		},
		onSuccess(data) {
			const typedData = data?.categories as Categories[];
			dispatch(appActions.addToAvailableCategories(typedData.map((category) => category.name)));
		},
		refetchOnWindowFocus: false,
	});
};

export default useGetDefaultItems;
