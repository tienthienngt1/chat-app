import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	true: true,
	false: false,
};

const test = createSlice({
	name: "testSlice",
	initialState,
	reducers: {
		changeTrueToTrue: (state) => ({ ...state, true: true }),
		changeTrueToFalse: (state) => ({ ...state, true: false }),
		changeFalseToFalse: (state) => ({ ...state, false: false }),
		changeFalseToTrue: (state) => ({ ...state, false: true }),
	},
});

export const {
	changeFalseToFalse,
	changeFalseToTrue,
	changeTrueToFalse,
	changeTrueToTrue,
} = test.actions;
export default test.reducer;
