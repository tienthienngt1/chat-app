import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, notification } from "antd";
import { setIsOpenModalFalse } from "../../../redux/slice/modalSlice";
import {insertRoom} from "../../../api/insert"
import styled from "styled-components"

const ModalWrap= styled(Modal)`
  .ant-modal{
    &-content, &-header, label, h2{
      ${props => props.theme.theme ? props.theme.light : props.theme.dark}
    }
  }
  label, h2{
      ${props => props.theme.theme ? props.theme.light : props.theme.dark}
    }
`

const CreateRoomModal = () => {
	const dispatch = useDispatch();
	const {modalReducer: {isOpen}, themeReducer} = useSelector((state) => state);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onCancel = () => {
		dispatch(setIsOpenModalFalse());
	};
	const onOk = async () => {
    setLoading(true);
		const data = form.getFieldValue();
		if(!data.room_name || !data.description){
      dispatch(setIsOpenModalFalse());
      notification["warning"]({
        message: "WARNING!",
        description: "Room name or description rooms invalid!"
      })
		  return;
		}
    const re = await insertRoom({...data})

    if(re.status){
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
		<ModalWrap
		  theme={themeReducer}
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
		</ModalWrap>
	);
};

export default CreateRoomModal;
