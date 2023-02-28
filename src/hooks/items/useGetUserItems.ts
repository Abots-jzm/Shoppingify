import { useAppDispatch, useAppSelector } from "./../../store/hooks";
import { useQuery } from "@tanstack/react-query";
import { db } from "./../../api/firebase/index";
import { doc, getDoc } from "firebase/firestore";
import { itemsQueryKeys, UserDocument } from "./types";
import storage from "../../util/storage";
import { appActions } from "../../store/slices/appSlice";

async function getUserItems(userId: string | null) {
	if (!userId) throw new Error("couldn't retrieve current user");

	return await getDoc(doc(db, "users/" + userId));
}

function useGetUserItems() {
	const userId = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();

	return useQuery([itemsQueryKeys.ADDED_ITEMS], () => getUserItems(userId || storage.get("uid")), {
		select(data) {
			const typedData = data.data() as UserDocument | undefined;
			return typedData?.addedItems || [];
		},
		onSuccess(data) {
			dispatch(appActions.setAddedItemsCount(data.length || 0));
			dispatch(appActions.addToAvailableCategories(data.map((item) => item.category)));
		},
		refetchOnWindowFocus: false,
	});
}

export default useGetUserItems;
