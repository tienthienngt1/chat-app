import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentRoom: null,
    listRoom: null
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        "setCurrentRoom": (state, payload) => {
            state.currentRoom = payload.payload
        },
        "setListRoom": (state, payload) => {
            state.listRoom = payload.payload
        },
        "resetRoom": state => {
            state.currentRoom = null
        }
    }
})

export const {setCurrentRoom, setListRoom, resetRoom} = roomSlice.actions
export default roomSlice.reducer