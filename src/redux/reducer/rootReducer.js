import { combineReducers } from "redux";
import userReducer from "./user";
import settingSlice from "./setting";
import modal from "./modal";
import currentRoom from "./currentRoom";

const rootReducer = combineReducers({
	userReducer,
	settingSlice,
	modal,
	currentRoom,
});

export default rootReducer;
