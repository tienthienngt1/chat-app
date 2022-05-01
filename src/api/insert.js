import {
	collection,
	updateDoc,
	addDoc,
	doc,
	serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import reload from "./reloadPage";

export const insertRoom = async (data) => {
	reload();
	const { displayName, email, phoneNumber, photoURL, uid } = auth.currentUser;
	const infoUser = {
		displayName,
		email,
		phoneNumber,
		photoURL,
		uid,
	};
	try {
		await addDoc(collection(db, "rooms"), {
			...data,
			photo: "",
			members: [uid],
			messages: [],
			info_member: [{ infoUser }],
			created_at: serverTimestamp(),
		});
		return { status: true };
	} catch (error) {
		return { error, status: false };
	}
};

export const insertMessage = async (room, message) => {
	reload();
	const convertMess = Array.from(room.messages);
	convertMess.push({
		id: room.id,
		message,
		created_at: (new Date()).getTime(),
		user: {
			id: auth.currentUser.uid,
			displayName: auth.currentUser.displayName,
			photoURL: auth.currentUser.photoURL,
		},
	});
	try {
        console.log(room.id);
		await updateDoc(doc(collection(db, "rooms"), room.id), {
			messages: convertMess,
		});
		return { status: true };
	} catch (error) {
		console.log(error);
		return { error, status: false };
	}
};

export const insertUser = async () => {
  reload();
  try{
		await addDoc(collection(db, "users"), {
		  displayName: auth.currentUser.displayName,
		  photoURL: auth.currentUser.photoURL,
		  email: auth.currentUser.email,
		  phoneNumber: auth.currentUser.phoneNumber,
		  uid: auth.currentUser.uid,
			keywords: generateKeywords(auth.currentUser.displayName),
			created_at: serverTimestamp(),
		});
		return { status: true };
  }catch(error) {
    console.log(error)
    return {status: false, error}
  }
}

const generateKeywords = (displayName) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);
  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];
  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }
  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName.toUpperCase());
    });
    return arrName;
  };
  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];
        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }
        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }
  findPermutation(0);
  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);
  return keywords;
};