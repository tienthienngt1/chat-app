import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export const updateMessage = async (title, payload) => {
	const roomRef = doc(db, "rooms", payload.id);
    console.log(payload.messages);
    const mess = {
        title,
        created_at: new Date(),
        infoMember: payload.user,
    }
	try {
	    await  updateDoc(roomRef, {
	        messages: payload.messages.concat(JSON.stringify(mess))
	    })
	    return {status: true}
	} catch (error) {
	    console.log(error);
	    return {status: false}
	}
};
