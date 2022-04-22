import {Col, Row, Avatar } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { onSnapshot, doc } from "firebase/firestore";
import { MessageInput, MessageGroup, Message, ChatContainer, MessageList } from '@chatscope/chat-ui-kit-react'
import { db,auth } from "../../../firebase/config";
import { insertMessage } from "../../../api/insert";
import { setCurrentRoom } from "../../../redux/slice/roomSlice";
import avatarEmpty from "../../../assets/avatarEmpty.png";

const WrapRow = styled(Row)`
	max-width: 650px;
	width: 100%;
	padding: 10px;
	height: 80vh;
`;

const BodyMessage = (props) => {
	const message = props.messages;
	const dispatch = useDispatch();
	const handleSendMessage = async (text) => {
		const res = await insertMessage(props, text);
		if (res.status) {
			onSnapshot(doc(db, "rooms", props.id), (docs) => {
				dispatch(setCurrentRoom({ ...docs.data(), id: docs.id }));
			});
		}
	};
	return (
		<Row justify="center">
			<WrapRow align="center">
				<Col span={24}>
      		<ChatContainer style={{height: "70vh"}}>
      		  <MessageList>
      			{ message && message.map((mess) => (
      			  <MessageGroup direction={ auth.currentUser.id === mess.id ? "outgoing" : "incoming" } sender={mess.user.displayName} >
      			    <Avatar as="Avatar" src={mess.user.photoURL}>
      			    {mess.user.displayName?.charAt(0)?.toUpperCase()}
      			    </Avatar>
      			    <MessageGroup.Messages>
      			      <Message model = {{ message: mess.message}} />
      			    </MessageGroup.Messages>
      			  </MessageGroup>
      			  ))}
      		  </MessageList>
        		<MessageInput onSend={handleSendMessage} placeholder="Type message here..." attachButton={false} />
      		</ChatContainer>
				</Col>
			</WrapRow>
		</Row>
	);
};

export default BodyMessage;
