import { useEffect } from "react";
import { Avatar, Button } from "antd";
import {doc, onSnapshot} from "firebase/firestore"
import { ConversationHeader} from '@chatscope/chat-ui-kit-react';
import {useDispatch, useSelector} from "react-redux"
import {AiOutlineUsergroupAdd} from "react-icons/ai"
import styled from "styled-components"
import {resetRoom, setCurrentRoom} from "../../../redux/slice/roomSlice"
import {setIsOpenInviteTrue} from "../../../redux/slice/modalSlice"
import {db} from "../../../firebase/config"

const ConversationHeaderWrap= styled(ConversationHeader)`
   ${props => props.theme.theme ? props.theme.light : props.theme.dark}
   .cs-conversation-header{
     &__user-name, &__info{
      ${props => props.theme.theme ? props.theme.light : props.theme.dark}
     }
   }
`

const HeaderMessage = (props) => {
  const dispatch = useDispatch()
  const {id} = useSelector(state => state.roomReducer.currentRoom)
  const theme = useSelector(state => state.themeReducer)
  const handleExitChat = () => {
    if(window.innerWidth < 576 ) props.setState(0);
    dispatch(resetRoom())
  }
  useEffect(() => {
    const unsubcribe = onSnapshot(doc(db, "rooms", props.id), docs=> {
      dispatch(setCurrentRoom({...docs.data(), id} ))
    })
    return () => unsubcribe()
  },[ dispatch, id, props])
	return (
		<ConversationHeaderWrap theme={theme}>
	    <ConversationHeader.Back onClick={handleExitChat}/>
  	    <Avatar as="Avatar" size='large' src={props.photo}>
  				{props?.room_name?.charAt(0)?.toUpperCase()}
  	    </Avatar>
	    <ConversationHeader.Content userName={props.room_name} info= {props.description} />
	    <ConversationHeader.Actions>
	    <Button icon={<AiOutlineUsergroupAdd />} size="large" shape="circle" as='Avatar' onClick={() => dispatch(setIsOpenInviteTrue())}/>
	      <Avatar.Group as="Avatar" maxCount={2}>
	      {
	        props.info_member.map((info,id) => (
	        <Avatar key={id} src={info.infoUser.photoURL} size='large'>
	          {info.infoUser.displayName?.charAt(0)?.toUpperCase()}
	        </Avatar>
	       ))
	      }
	      </Avatar.Group>
	    </ConversationHeader.Actions>
		</ConversationHeaderWrap>
	);
};

export default HeaderMessage;
