import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMessage: []
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        "setMessage": (state, payload) => {
            state.currentMessage = payload.payload
        },
        "resetMessage": state => {
            state.currentMessage = []
        }
    }
})

export const {setMessage} = messageSlice.actions
export default messageSlice.reducer