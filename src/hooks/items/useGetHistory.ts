import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useQuery } from "@tanstack/react-query";
import { db } from "../../api/firebase/index";
import { doc, getDoc } from "firebase/firestore";
import { itemsQueryKeys, UserDocument } from "./types";
import storage from "../../util/storage";

async function getHistory(userId: string | null) {
	if (!userId) throw new Error("couldn't retrieve current user");

	return await getDoc(doc(db, "users/" + userId));
}

function useGetHistory() {
	const userId = useAppSelector((state) => state.auth.uid);

	return useQuery([itemsQueryKeys.HISTORY], () => getHistory(userId || storage.get("uid")), {
		select(data) {
			const typedData = data.data() as UserDocument | undefined;
			return typedData?.history || [];
		},
		refetchOnWindowFocus: false,
	});
}

export default useGetHistory;
