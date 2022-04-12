import {
	query,
	collection,
	getDocs,
	where,
	doc,
	setDoc,
	getDoc,
	onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/config";

export const getListRoom = async (uid) => {
	const condition = query(
		collection(db, "rooms"),
		where("members", "array-contains", uid)
	);
	try {
		let result = [];
		const get = await getDocs(condition);
		get.forEach((doc) => {
			result.push(Object.assign(doc.data(), { id: doc.id }));
		});
		return { result, status: true };
	} catch (error) {
		return { error, status: false };
	}
};

export const onSnapshotRoom = id => {
  try {
    onSnapshot(doc(db, "rooms", id), doc => {
      console.log(doc.data())
      return doc.data()
    })
  }catch (error){
    return error
  }
  const docRoom = doc(db, 'rooms', id);
}