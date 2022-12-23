import { signInAnonymously } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../api/firebase";

async function guestLogin() {
	return await signInAnonymously(auth);
}

const useGuestLogin = () => {
	return useMutation(guestLogin);
};

export default useGuestLogin;
