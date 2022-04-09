import {doc, setDoc} from "firebase/firestore"
import {db} from "./config"

export const addUserToDB = async data => {
    try {
        const action = await  setDoc(doc(db, "user"),data)
        return action
    } catch (error) {
        return error
    }
}