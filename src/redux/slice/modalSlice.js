import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpenTrue: state => {
      state.isOpen = true
    },
    setIsOpenFalse: state => {
      state.isOpen = false
    }
  }
})

export const {setIsOpenFalse, setIsOpenTrue} = modalSlice.actions
export default modalSlice.reducer