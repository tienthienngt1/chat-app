import {useState} from "react"
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ChatRoom from "./ChatRoom";
import HeaderNavbar from "./HeaderNavbar";
import Setting from "./Setting";

const selectIsDisplaySetting = createSelector(
    state => state.settingSlice,
    settingSlice => settingSlice.isDisplaySetting,
)

const Navbar = () => {

    
    
    const state = useSelector(selectIsDisplaySetting)
    console.log("setting_slice:" + state);
	return (
		<>
			{state ? (
				<Setting />
			) : (
				<>
					<HeaderNavbar />
					<ChatRoom />
				</>
			)}
		</>
	);
};

export default Navbar;
