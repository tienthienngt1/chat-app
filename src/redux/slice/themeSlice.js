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
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: state => {
      state.theme = !state.theme
    },
  }
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer