import { useMutation, useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase/index";
import { itemsQueryKeys } from "./types";

async function getDefualtItems() {
	return await getDoc(doc(db, "master/default items"));
}

const useGetDefaultItems = () => {
	return useQuery([itemsQueryKeys.DEFAULT], getDefualtItems, {
		select(data) {
			return data.data();
		},
		refetchOnWindowFocus: false,
	});
};

export default useGetDefaultItems;
