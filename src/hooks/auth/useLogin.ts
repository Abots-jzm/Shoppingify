import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase";

type EmailAndPassword = {
	email: string;
	password: string;
};

async function login(payload: EmailAndPassword) {
	return await signInWithEmailAndPassword(auth, payload.email, payload.password);
}

const useLogin = () => {
	return useMutation(login);
};

export default useLogin;
