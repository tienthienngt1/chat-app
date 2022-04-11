import { collection, setDoc, addDoc, doc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import reload from "./reloadPage";

export const insertRoom = async (data) => {
    reload();
    const {displayName, email, phoneNumber, photoURL, uid} = auth.currentUser
    const infoUser = {
        displayName, email, phoneNumber, photoURL, uid
    }
	try {
		await addDoc(collection(db, "rooms"), {
			...data,
			photo: "",
			members: [uid],
            info_member: [{infoUser}],
			created_at: serverTimestamp(),
		});
		return { status: true };
	} catch (error) {
		return { error, status: false };
	}
};

export const insertMessage = async (room, message) => {
    console.log(room);
    console.log(message);
    reload();
    try {
        await setDoc(doc(collection(db, "messages"), room.id), {
            content: [{
                message: message,
                photoURL: auth.currentUser.photoURL,
                displayName: auth.currentUser.displayName,
                created_at: new Date(),
            }]
        })
        return {status: true}
    } catch (error) {
        return {error, status: false}
    }
}