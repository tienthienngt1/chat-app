import { useEffect, useState } from "react";
import { Typography, Col, Tooltip, Input, Row, Avatar } from "antd";
import {
	DownCircleFilled,
	SendOutlined,
	SmileOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onSnapshot, doc } from "firebase/firestore";
import { updateMessage } from "../../../api/update";
import { onSnapshotRoom } from "../../../api/get";
import { db, auth } from "../../../firebase/config";
import { insertMessage } from "../../../api/insert";
import { setCurrentRoom } from "../../../redux/slice/roomSlice";

const WrapMessage = styled(Col)`
	background: ${(props) => props.background};
	border-radius: 10px;
	padding: 10px;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
		rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Message = (props) => {
	const message = props.messages;
	return (
		<>
			{message &&
				message.map((mess, id) =>
					mess.user.id === auth.currentUser.uid ? (
						<Row
							key={id}
							align="bottom"
							style={{
								margin: "10px 0px",
							}}
						>
							<Col span={20} md={21} lg={22}>
								<Row
									justify="end"
									style={{
										wordBreak: "break-word",
										padding: "0px 10px",
										marginTop: "10px",
									}}
								>
									<WrapMessage background="#d8c3fa9c">
										<Typography.Title
											level={4}
											style={{ textAlign: "right" }}
										>
											{mess && mess.user.displayName}
										</Typography.Title>
										<Typography.Text>
											{mess && mess.message}
										</Typography.Text>
									</WrapMessage>
								</Row>
							</Col>
							<Col span={4} md={3} lg={2}>
								<Row>
									<Avatar
										src={mess && mess.user.photoURL}
										size="large"
									>
										{mess?.user.displayName?.charAt(0).toUpperCase()}
									</Avatar>
								</Row>
							</Col>
						</Row>
					) : (
						<Row
							key={id}
							align="bottom"
							style={{ margin: "10px 0px" }}
						>
							<Col span={4} md={3} lg={2}>
								<Row justify="end">
									<Avatar
										src={mess && mess.user.photoURL}
										size="large"
									>
										{mess?.user.displayName?.charAt(0)?.toUpperCase()}
									</Avatar>
								</Row>
							</Col>
							<Col span={20} md={21} lg={22}>
								<Row
									style={{
										wordBreak: "break-word",
										padding: "0px 10px",
										marginTop: "10px",
									}}
								>
									<WrapMessage background="white">
										<Typography.Title level={4}>
                                        {mess && mess.user.displayName}
										</Typography.Title>
										<Typography.Text>
										{mess && mess.message}
										</Typography.Text>
									</WrapMessage>
								</Row>
							</Col>
						</Row>
					)
				)}
		</>
	);
};

const WrapMessageContent = styled(Row)`
	height: 100%;
`;

const MessageContent = (props) => {
	return (
		<WrapMessageContent align="bottom">
			<Col span={24}>
				<Message {...props} />
			</Col>
		</WrapMessageContent>
	);
};

const WrapInput = styled.div`
	width: 100%;
	border-radius: 15px;
	padding: 10px;
	background: white;
	.ant-row .ant-col input {
		width: 100%;
	}
	svg {
		color: grey;
	}
`;

const InputAndSend = (props) => {
	const dispatch = useDispatch();
	const [valueInput, setValueInput] = useState("");
	const handleSendMessage = async (e) => {
		const res = await insertMessage(props, valueInput);
		console.log(res);
		if (res.status) {
			onSnapshot(doc(db, "rooms", props.id), (docs) => {
				dispatch(setCurrentRoom({ ...docs.data(), id: docs.id }));
			});
		}
		setValueInput("");
	};
	return (
		<>
			<Row align="middle">
				<Col span={19} sm={21} lg={22}>
					<WrapInput>
						<Input
							placeholder="Message"
							bordered={false}
							value={valueInput}
							onChange={(e) => setValueInput(e.target.value)}
							onPressEnter={handleSendMessage}
						/>
					</WrapInput>
				</Col>
				<Col span={5} sm={3} lg={2}>
					<Tooltip title="Send Message">
						<SendOutlined
							onClick={handleSendMessage}
							style={{ fontSize: "20px", marginLeft: "15px" }}
						/>
					</Tooltip>
				</Col>
			</Row>
		</>
	);
};

const WrapRow = styled(Row)`
	max-width: 650px;
	width: 100%;
	padding: 10px;
	height: calc(100vh - 60px);
	svg[data-icon="send"] {
		fill: blue;
		font-size: 33px;
	}
	& > .ant-col:first-child {
		height: calc(100vh - 30px - 60px - 60px);
	}
	& > .ant-col:last-child {
		height: 60px;
		margin: 10px 0px 20px 0px;
	}
`;

const BodyMessage = (props) => {
	return (
		<Row justify="center">
			<WrapRow align="center">
				<Col span={24}>
					<MessageContent {...props} />
				</Col>
				<Col span={24}>
					<InputAndSend {...props} />
				</Col>
			</WrapRow>
		</Row>
	);
};

export default BodyMessage;
