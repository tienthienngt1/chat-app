import { Avatar, Space, Typography, Button, Tooltip } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import {useSelector, useDispatch} from "react-redux"
import {changeTrueToTrue, changeFalseToTrue} from "../../../redux/reducer/test"

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
    button{
        position: absolute;
        bottom: 20px;
        right: 10px;
    }
`;

const ChatRoom = () => {
    const dispatch = useDispatch()
    const handleAdd = () => {
        console.log("button add");
        dispatch(changeFalseToTrue())
    }
    const test  = useSelector(state => state.test)
    const setting = useSelector(state => state.settingSlice)
    console.log('chatroom', test);
	return (
		<Container>
			<Wrap>
				<Space direction="horizontal">
					<Avatar src="" size="large">
						a
					</Avatar>
					<div>
						<Typography.Title level={5}>
							NFT Reward Channel
						</Typography.Title>
						<Typography.Text>NFT Reward Channel</Typography.Text>
					</div>
				</Space>
			</Wrap>
			<Tooltip title="Create Chat Room">
				<Button shape="circle" size="large" type="primary" onClick={handleAdd} >
					<PlusOutlined />
				</Button>
			</Tooltip>
		</Container>
	);
};

export default ChatRoom;
