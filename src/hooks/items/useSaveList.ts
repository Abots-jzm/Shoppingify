import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { itemsQueryKeys, SaveListPayload } from "./types";

async function saveList(payload: SaveListPayload) {
	return await setDoc(doc(db, "users", payload.userId), { history: arrayUnion(payload.data) }, { merge: true });
}

function useSaveList() {
	// const queryClient = useQueryClient();

	return useMutation(saveList, {
		onSuccess() {
			// queryClient.invalidateQueries([itemsQueryKeys.ADDED_ITEMS]);
		},
	});
}

export default useSaveList;
