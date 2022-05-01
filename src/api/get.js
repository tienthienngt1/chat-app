import {
	query,
	collection,
	getDocs,
	where,
	doc,
	onSnapshot,
	orderBy
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
        const result = doc.data()
      return {result, status: true} 
    })
  }catch (error){
    return {status: false}
  }
}

export const getUser = async (keyword) => {
  if(!keyword) return;
  const userCollection = collection(db, 'users')
  try{
    let result=[]
    const condition = query(userCollection, where("keywords", "array-contains", keyword?.toUpperCase()), orderBy("displayName"))
    const res = await getDocs(condition)
    res.forEach(doc => {
      result.push(doc.data())
    })
    return {status:true, result}
  }catch(error) {
    console.log(error)
    return{status:false, error}
  }
}

export const getInfoUser = async id => {
  try{
    const q = query(collection(db, "users"), where("uid", "==", id))
    let result;
    const requestGet = await getDocs(q)
    requestGet.forEach(doc => {
      result=doc.data()
    })
      return{status:true, result}
  } catch(error) {
    console.log(error)
    return{status:false, error}
  }
}