import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import {combineReducers} from "redux"

const rootReducer = combineReducers({
  userReducer,modalReducer
})

export default rootReducer;