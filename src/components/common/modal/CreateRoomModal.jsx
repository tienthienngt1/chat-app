import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, notification } from "antd";
import { setIsOpenModalFalse } from "../../../redux/slice/modalSlice";
import { create_room } from "../../../api/create";
import { setCurrentRoom } from "../../../redux/slice/roomSlice";

const CreateRoomModal = () => {
	const dispatch = useDispatch();
	const {isOpen} = useSelector((state) => state.modalReducer);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onCancel = () => {
		dispatch(setIsOpenModalFalse());
	};
	const onOk = async () => {
        setLoading(true);
		const data = form.getFieldValue();
        const res = await create_room({...data})

        if(res.status){
            dispatch(setCurrentRoom(data))
            notification["success"]({
                message: "Create successfully!",
                description: "Happy fund!"
            })
        }else{
            notification["error"]({
                message: "Error!",
                description: "Try again!"
            })
        }
        dispatch(setIsOpenModalFalse());
	};
	return (
		<Modal
			visible={isOpen}
			onCancel={onCancel}
			title={
				<center>
					<h2>Create New Room</h2>
				</center>
			}
			onOk={onOk}
            confirmLoading={loading}
		>
			<Form form={form}>
				<Form.Item
					name="room_name"
					label="Name"
					labelCol={{ span: 4 }}
					rules={[{ required: true }]}
				>
					<Input placeholder="Enter your room name... " />
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
					labelCol={{ span: 4 }}
					rules={[{ required: true }]}
				>
					<Input.TextArea placeholder="Description..." />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateRoomModal;
