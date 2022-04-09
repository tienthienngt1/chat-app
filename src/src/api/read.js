import {query, collection, getDocs,where} from "firebase/firestore"
import {db} from "../firebase/config"

export const getChatRoom = async uid => {
    const q = query(collection(db, "rooms"), where('members', "array-contains", uid))
    try {
        let result = [] 
        const get = await getDocs(q)
        get.forEach(doc => {
            console.log(Object.assign(doc.data(), {id: doc.id}));
            result.push(Object.assign(doc.data(), {id: doc.id}))
        })
        return {result, status: true}
    } catch (error) {
        return {error, status: false}
    }
}