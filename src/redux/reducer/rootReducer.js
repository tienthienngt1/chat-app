import { combineReducers } from "redux";
import userReducer from "./user";
import settingSlice from "./setting";
import test from "./test";
import modal from "./modal";
import currentRoom from "./currentRoom";

const rootReducer = combineReducers({
	userReducer,
	settingSlice,
	test,
	modal,
	currentRoom,
});

export default rootReducer;
