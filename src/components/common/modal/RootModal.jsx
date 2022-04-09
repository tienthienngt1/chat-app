import { useSelector } from "react-redux";
import CreateRoomModal from "./CreateRoomModal";

const RootModal = () => {
	const {modalReducer} = useSelector((state) => state);
	return <>{modalReducer.isOpen && <CreateRoomModal />}</>;
};

export default RootModal;
