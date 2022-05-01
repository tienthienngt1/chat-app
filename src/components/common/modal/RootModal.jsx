import { useSelector } from "react-redux";
import CreateRoomModal from "./CreateRoomModal";
import InviteModal from "./InviteModal";

const RootModal = () => {
	const {modalReducer} = useSelector((state) => state);
	return (
	  <>
    	{modalReducer.isOpen && <CreateRoomModal />}
    	{modalReducer.isOpenInvite && <InviteModal />}
  	</>)
};

export default RootModal;
