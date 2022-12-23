import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";

type EmailAndPassword = {
	email: string;
	password: string;
};

async function signup(payload: EmailAndPassword) {
	return await createUserWithEmailAndPassword(auth, payload.email, payload.password);
}

const useSignup = () => {
	return useMutation(signup);
};

export default useSignup;
