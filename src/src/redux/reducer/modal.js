import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createRoomModal: false,
}

const modal = createSlice({
    name: "reset",
    initialState,
    reducers:{
        "create_room_modal_true": state => ({...state, createRoomModal: true}),
        "create_room_modal_false": state => ({...state, createRoomModal: false})
    }
})

export const {create_room_modal_false, create_room_modal_true} = modal.actions
export default modal.reducer
