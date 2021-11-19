import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDisplaySetting: false,
}

export const settingSlice = createSlice({
    name: "settingSlice",
    initialState,
    reducers: {
        "set_false": state => ({...state, isDisplaySetting: false}),
        "set_true": state => ({...state, isDisplaySetting: true}),
    }
})

export const {set_false, set_true} = settingSlice.actions
export default settingSlice.reducer