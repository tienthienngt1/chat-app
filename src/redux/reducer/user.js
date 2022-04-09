import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isLogin: false,
}

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        "user": (state, payload) => {
          state.user = payload.payload;
          state.isLogin = true
        }
    }
})
export const {user} = userReducer.actions
export default userReducer.reducer;