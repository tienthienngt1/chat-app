import { collection, setDoc,updateDoc, addDoc, doc, serverTimestamp } from "@firebase/firestore";
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
			messages: [], 
            info_member: [{infoUser}],
			created_at: serverTimestamp(),
		});
		return { status: true };
	} catch (error) {
		return { error, status: false };
	}
};

export const insertMessage = async (room, message) => {
    reload()
    const convertMess = Array.from(room.messages)
    convertMess.push({
      message,
      created_at: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      }
    })
    try {
        await updateDoc(doc(collection(db, "rooms"), room.id), {
            messages: convertMess,
        })
        return {status: true}
    } catch (error) {
        return {error, status: false}
    }
}