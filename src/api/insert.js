import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import reload from "./reloadPage";

export const insertRoom = async (data) => {
    reload();
	const { displayName, uid, email, photoURL, phoneNumber } = auth.currentUser;
	try {
		await addDoc(collection(db, "rooms"), {
			...data,
			photo: "",
			members: [auth.currentUser.uid],
			infoMembers: [{ displayName, uid, email, phoneNumber, photoURL }],
			created_at: serverTimestamp(),
		});
		return { status: true };
	} catch (error) {
		return { error, status: false };
	}
};