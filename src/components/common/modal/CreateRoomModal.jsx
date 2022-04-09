import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, notification } from "antd";
import { create_room_modal_false } from "../../../redux/reducer/modal";
import { create_room } from "../../../api/create";

const CreateRoomModal = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.modal.createRoomModal);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onCancel = () => {
		dispatch(create_room_modal_false());
	};
	const onOk = async () => {
        setLoading(true);
		const data = form.getFieldValue();
        const res = await create_room({...data})
        if(res.status){
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
        dispatch(create_room_modal_false());
	};
	return (
		<Modal
			visible={state}
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
