import { combineReducers } from "redux";
import userReducer from "./user";
import settingSlice from "./setting"

const rootReducer = combineReducers({userReducer, settingSlice})

export default rootReducer