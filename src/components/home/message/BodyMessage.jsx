import {Col, Row, Avatar } from "antd";
import { useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import { onSnapshot, doc } from "firebase/firestore";
import { MessageInput, MessageGroup, Message, ChatContainer, MessageList } from '@chatscope/chat-ui-kit-react'
import { db,auth } from "../../../firebase/config";
import { insertMessage } from "../../../api/insert";
import { setCurrentRoom } from "../../../redux/slice/roomSlice";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WrapRow = styled(Row)`
	max-width: 650px;
	width: 100%;
	padding: 10px;
  .cs-message{
    &-list, &-input, &__sent-time{
      ${props => props.theme.theme ? props.theme.light : props.theme.dark}
    }
  }
`;

const BodyMessage = (props) => {
  const theme = useSelector(state => state.themeReducer)
	const message = props.messages;
	const dispatch = useDispatch();
	const handleSendMessage = async (txt) => {
	  if(!txt) return;
	  const text = txt.trim()
		const res = await insertMessage(props, text);
		if (res.status) {
			onSnapshot(doc(db, "rooms", props.id), (docs) => {
				dispatch(setCurrentRoom({ ...docs.data(), id: docs.id }));
			});
		}
	};
	const getDate = time => time.getDate()
	const getYear = time => time.getFullYear()
	const getMonth = time => time.getMonth()
	const getHours = time => time.getHours()
	const getMinutes = time => time.getMinutes()
	const getSeconds = time => time.getSeconds()
	const handleTime = time => {
	  const times = new Date(time)
	  return {
	    Y: getYear(times),
	    M: getMonth(times),
	    D: getDate(times),
	    h: getHours(times),
	    m: getMinutes(times),
	    s: getSeconds(times),
	  }
	}
	return (
		<Row justify="center">
			<WrapRow align="center" theme={theme}>
				<Col span={24}>
      		<ChatContainer style={{height: "80vh"}}>
      		  <MessageList>
      			{ message && message.map((mess) => (
      			  <MessageGroup direction={ auth.currentUser.uid === mess.user.id ? "outgoing" : "incoming" } sender={mess.user.displayName}>
      			    <Avatar as="Avatar" src={mess.user.photoURL}>
      			    {mess.user.displayName?.charAt(0)?.toUpperCase()}
      			    </Avatar>
      			    <MessageGroup.Messages>
      			      <Message model = {{ message: mess.message}}/>
      			      <Message.Footer sentTime={
      			        formatDistanceToNow(new Date(handleTime(mess.created_at).Y, handleTime(mess.created_at).M, handleTime(mess.created_at).D, handleTime(mess.created_at).h, handleTime(mess.created_at).m, handleTime(mess.created_at).s), {addSuffix: true, includeSeconds: true})
      			      }
      			       />
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
