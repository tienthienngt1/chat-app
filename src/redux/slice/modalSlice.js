import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
  isOpenInvite: false
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpenModalTrue: state => {
      state.isOpen = true
    },
    setIsOpenModalFalse: state => {
      state.isOpen = false
    },
    setIsOpenInviteTrue: state => {
      state.isOpenInvite = true
    },
    setIsOpenInviteFalse: state => {
      state.isOpenInvite = false
    },
  }
})

export const {setIsOpenModalFalse, setIsOpenModalTrue, setIsOpenInviteFalse, setIsOpenInviteTrue} = modalSlice.actions
export default modalSlice.reducer