import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import reload from "./reloadPage";

export const create_room = async (data) => {
    reload();
	try {
		await addDoc(collection(db, "rooms"), {
			...data,
			photo: "",
			members: [auth.currentUser.uid],
			created_at: serverTimestamp(),
		});
		return { status: true };
	} catch (error) {
		return { error, status: false };
	}
};
