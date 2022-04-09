import { useEffect, useState, useMemo } from "react";
import { Avatar, Space, Typography, Button, Tooltip, Alert } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { create_room_modal_true } from "../../../redux/reducer/modal";
import { onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "../../../firebase/config";
import { getChatRoom } from "../../../api/read";
import { selectCurrentRoom } from "../../../redux/reducer/currentRoom";

const Wrap = styled.div`
	padding: 10px;
	border-bottom: 1px solid grey;
`;

const Container = styled.div`
	margin-top: 65px;
	position: relative;
	overflow: scroll;
	padding: 5px;
	height: calc(100vh - 67px);
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
`;

const CreateRoomButton = () => {
	const dispatch = useDispatch();
	const handleAdd = () => {
		dispatch(create_room_modal_true());
	};

	return (
		<>
			<Tooltip title="Create Chat Room">
				<Button
					shape="circle"
					size="large"
					type="primary"
					onClick={handleAdd}
				>
					<PlusOutlined />
				</Button>
			</Tooltip>
		</>
	);
};
const Room = (props) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.currentRoom);
	const handleSelectRoom = () => {
		dispatch(selectCurrentRoom(props));
	};

	return (
		<>
			<Wrap onClick={handleSelectRoom}>
				<Space direction="horizontal">
					<Avatar src={props.photoURL} size="large">
						{props?.room_name?.charAt(0)?.toUpperCase()}
					</Avatar>
					<div>
						<Typography.Title level={5}>
							{props?.room_name?.toUpperCase()}
						</Typography.Title>
						<Typography.Text>{props?.description}</Typography.Text>
					</div>
				</Space>
			</Wrap>
		</>
	);
};

const ChatRoom = () => {
	const [rooms, setRooms] = useState();
	const createButtonComponent = useMemo(() => <CreateRoomButton />, []);
	useEffect(() => {
		const func = async () => {
			const getRooms =
				auth.currentUser && (await getChatRoom(auth.currentUser.uid));
			getRooms && setRooms(getRooms.result);
		};
		const subcribe = onSnapshot(collection(db, "rooms"), (doc) => {
			func();
		});
		return () => subcribe();
	}, []);

	return (
		<Container>
			{rooms && rooms.length ? (
				rooms.map((rooms, id) => <Room key={id} {...rooms} />)
			) : (
				<Alert
					type="info"
					message="You haven't joined any room yet!"
					showIcon
				/>
			)}
			{createButtonComponent}
		</Container>
	);
};

export default ChatRoom;
