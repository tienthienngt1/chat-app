import { useEffect, useMemo } from "react";
import { Avatar, Space, Typography, Button, Tooltip, Alert } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenModalTrue } from "../../../redux/slice/modalSlice";
import { onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "../../../firebase/config";
import { getListRoom } from "../../../api/get";
import { setCurrentRoom, setListRoom } from "../../../redux/slice/roomSlice";

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
		dispatch(setIsOpenModalTrue());
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
	//definition
	const dispatch = useDispatch();
	const selectRoom = () => {
		dispatch(setCurrentRoom(props));
	};
    //return
	return (
		<>
			<Wrap onClick={selectRoom}>
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
	// definition
	const { listRoom } = useSelector((state) => state.roomReducer);
	const dispatch = useDispatch();
	const createButtonComponent = useMemo(() => <CreateRoomButton />, []);
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
		<Container>
			{listRoom && listRoom.length ? (
				listRoom.map((listRoom, id) => <Room key={id} {...listRoom} />)
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
