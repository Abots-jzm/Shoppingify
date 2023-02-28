import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { AddNewItemPayload, itemsQueryKeys } from "./types";

async function addNewItem(payload: AddNewItemPayload) {
	return await setDoc(doc(db, "users", payload.userId), { addedItems: arrayUnion(payload.data) }, { merge: true });
}

function useAddNewItem() {
	const queryClient = useQueryClient();

	return useMutation(addNewItem, {
		onSuccess() {
			queryClient.invalidateQueries([itemsQueryKeys.ADDED_ITEMS]);
		},
	});
}

export default useAddNewItem;
