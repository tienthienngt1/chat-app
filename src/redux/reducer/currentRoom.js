import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is: false,
    rooms: {}
};

const currentRoom = createSlice({
	name: "currentRoom",
	initialState,
	reducers: {
		"selectCurrentRoom": (state, payload) => {
			return { 
                ...state,
                is: true,
                rooms: {...payload},
            }
		},
		"leaveCurrentRoom": state => {
			return { 
                ...state,
                is: false,
                rooms: {},
            }
		},
	},
});

export const {selectCurrentRoom, leaveCurrentRoom} = currentRoom.actions
export default currentRoom.reducer
