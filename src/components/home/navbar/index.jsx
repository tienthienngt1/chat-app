import {useState} from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChatRoom from "./ChatRoom";
import HeaderNavbar from "./HeaderNavbar";
import Setting from "./Setting";

const Wrap = styled.div``;

const Navbar = () => {
    const state = useSelector(state => state.settingSlice.isDisplaySetting)
	return (
		<Wrap>
			{state ? (
				<Setting />
			) : (
				<>
					<HeaderNavbar />
					<ChatRoom />
				</>
			)}
		</Wrap>
	);
};

export default Navbar;
