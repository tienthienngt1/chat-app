import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  theme: true,
  light: {
    background: "#fff",
    color: "#000",
  },
  dark: {
    background: "#00152a",
    color: "#fff",
  },
  loading: false,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: state => {
      state.theme = !state.theme
    },
    setLoadingTrue: state => {
      state.loading = true
    },
    setLoadingFalse: state => {
      state.loading = false
    },
  }
})

export const {setTheme, setLoadingFalse, setLoadingTrue} = themeSlice.actions
export default themeSlice.reducer