import { useEffect } from "react";
import {Avatar, Alert } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ConversationList, Conversation } from '@chatscope/chat-ui-kit-react';
import { onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "../../../firebase/config";
import { getListRoom } from "../../../api/get";
import { setCurrentRoom, setListRoom } from "../../../redux/slice/roomSlice";

const Container = styled.div`
	margin-top: 65px;
	position: relative;
	height: 80vh;
	overflow: scroll;
	padding: 5px;
	border-top: 2px solid #000;
	border-right: 2px solid #000;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	/* Hide scrollbar for Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}
	button {
		position: absolute;
		bottom: 20px;
		right: 10px;
	}
	.cs-conversation__name, .cs-conversation__info{
	   color: ${props => props.theme.theme ? '#000' : '#fff'}
	}
`;

const Room = (props) => {
	//definition
	const dispatch = useDispatch();
	const selectRoom = () => {
		dispatch(setCurrentRoom(props));
		if(window.innerWidth < 576){
		  props.setState(2)
		}
	};
    //return
	return (
		<Conversation onClick={selectRoom} name={props.room_name} info={props.description}>
				<Avatar as="Avatar" src={props.photoURL} style={{marginRight: "10px"}}>
					{props?.room_name?.charAt(0)?.toUpperCase()}
				</Avatar>
		</Conversation>
	);
};

const ChatRoom = (props) => {
	// definition
	const { roomReducer: {listRoom}, themeReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	//effect
	useEffect(() => {
		const func = async () => {
			const getRooms =
				auth.currentUser && (await getListRoom(auth.currentUser.uid));
			getRooms && dispatch(setListRoom(getRooms.result));
		};
		const subcribe = onSnapshot(collection(db, "rooms"), (doc) => {
			func();
		});
		return () => subcribe();
	}, [dispatch]);
	//return
	return (
		<Container theme={themeReducer}>
				<ConversationList>
			{listRoom && listRoom.length ? (
				listRoom.map((listRoom, id) => <Room key={id} {...listRoom} {...props} />)
			) : (
				<Alert
				  as="Conversation"
					type="info"
					message="You haven't joined any room yet!"
					showIcon
				/>
			)}
				</ConversationList>
		</Container>
	);
};

export default ChatRoom;
