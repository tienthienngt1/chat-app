import {
  doc,
  updateDoc
} from "firebase/firestore";
import {
  db
} from "../firebase/config";
import {
  getInfoUser
} from "./get"

export const updateMessage = async (title, payload) => {
  const roomRef = doc(db, "rooms", payload.id);
  const mess = {
    title,
    created_at: new Date(),
    infoMember: payload.user,
  }
  try {
    await updateDoc(roomRef, {
      messages: payload.messages.concat(JSON.stringify(mess))
    })
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
};

export const updateMember = async (memberNew, currentRoom) => {
  let status = 1
  const setStatus = val => status = val
  const infoMemberOld = Array.from(currentRoom.info_member)
  const memberOld = Array.from(currentRoom.members)
  memberNew.forEach(async id => {
    if (memberOld.indexOf(id) !== -1) {
      setStatus(2)
      return
    }
    const res = await getInfoUser(id)
    if (res.status) {
      const infoUser = res.result
      infoMemberOld.push({
        infoUser: {
          displayName: infoUser.displayName,
          email: infoUser.email,
          uid: infoUser.uid,
          photoURL: infoUser.photoURL,
          phoneNumber: infoUser.phoneNumber,
        }})
      memberOld.push(id)
      try {
        await updateDoc(doc(db, "rooms", currentRoom.id), {
          info_member: infoMemberOld,
          members: memberOld
        })
        return
      } catch (error) {
        console.log(error)
        setStatus(0)
        return
      }
    } else {
      setStatus(0)
      return;
    }
  })
  return {
    status
  }
}