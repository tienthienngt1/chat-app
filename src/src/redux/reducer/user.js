import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: [],
    isLogin: false,
}

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        "user": (state, payload) => ({...state, user: payload.payload, isLogin: true})
    }
})
export const {user} = userReducer.actions
export default userReducer.reducer;