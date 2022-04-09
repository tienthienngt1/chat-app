
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, payload) => {
            state.user = payload.payload
        }
    }
})
export default userSlice.reducer