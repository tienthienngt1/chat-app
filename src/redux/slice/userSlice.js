import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLogin: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoginTrue: (state, payload) => {
            state.user = payload.payload
            state.isLogin = true
        },
        setIsLoginFalse: state => {
            state.user = null
            state.isLogin = false
        },
    }
})

export const { setIsLoginFalse, setIsLoginTrue} = userSlice.actions
export default userSlice.reducer