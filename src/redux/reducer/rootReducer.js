import { combineReducers } from "redux";
import userReducer from "./user";
import settingSlice from "./setting"
import test from "./test"

const rootReducer = combineReducers({userReducer, settingSlice, test})

export default rootReducer