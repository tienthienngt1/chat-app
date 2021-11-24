import { collection, addDoc, serverTimestamp } from "@firebase/firestore"
import {db} from "../firebase/config"
import {auth} from "../firebase/config"


export const create_room = async data  => {
    const {displayName, uid, email, photoURL, phoneNumber} = auth.currentUser
    try {
        await addDoc(collection(db, "rooms"), {
            ...data,
            photo: "",
            messages: [],
            members: [auth.currentUser.uid],
            infoMembers: [{displayName, uid, email, phoneNumber, photoURL}],
            created_at: serverTimestamp(),
        })
        return {status: true}
    } catch (error) {
        return {error, status: false}
    }
}