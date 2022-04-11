import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
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
    }
  }
})

export const {setIsOpenModalFalse, setIsOpenModalTrue} = modalSlice.actions
export default modalSlice.reducer