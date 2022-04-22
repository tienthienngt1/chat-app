import { Avatar } from "antd";
import { ConversationHeader} from '@chatscope/chat-ui-kit-react';
import {useDispatch} from "react-redux"
import {resetRoom} from "../../../redux/slice/roomSlice"

const HeaderMessage = (props) => {
  const dispatch = useDispatch()
  const handleExitChat = () => {
    if(window.innerWidth < 576 ) props.setState(0);
    dispatch(resetRoom())
  }
	return (
		<ConversationHeader>
	    <ConversationHeader.Back onClick={handleExitChat}/>
  	    <Avatar as="Avatar" size='large' src={props.photo}>
  				{props?.room_name?.charAt(0)?.toUpperCase()}
  	    </Avatar>
	    <ConversationHeader.Content userName={props.room_name} info= {props.description} />
	    <ConversationHeader.Actions>
	      <Avatar as="Avatar" size="large" src="" name="tienthien">
	      T
	      </Avatar>
	    </ConversationHeader.Actions>
		</ConversationHeader>
	);
};

export default HeaderMessage;
