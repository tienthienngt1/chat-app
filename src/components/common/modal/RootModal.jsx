import { useSelector } from "react-redux";
import CreateRoomModal from "./CreateRoomModal";

const RootModal = () => {
	const modal = useSelector((state) => state.modal);
	return <>{modal.createRoomModal && <CreateRoomModal />}</>;
};

export default RootModal;
