import { combineReducers } from "redux";
import userReducer from "./slice/userSlice";
import modalReducer from "./slice/modalSlice";
import roomReducer from "./slice/roomSlice";
import messageReducer from "./slice/messageSlice"

const rootReducer = combineReducers({
	userReducer,
	modalReducer,
	roomReducer,
    messageReducer,
});

export default rootReducer;
